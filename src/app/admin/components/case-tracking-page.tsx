'use client';

import supabase from '@/lib/supabaseClient';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MapPin,
  FileText,
  FileSpreadsheet,
  Mail,
  AlertTriangle,
  Plus,
  Pencil,
  Trash,
} from 'lucide-react';

const usageOptions = [
  '育成與創業空間',
  '公共休憩空間',
  '文化資產與古蹟活化',
  '訓練設施',
  '社會福利與照顧設施',
  '商業進駐',
  '消防與警察設施',
  '行政設施',
];
interface Case {
  案件ID: number;
  案件名稱: string;
  資產類型: string;
  行政區: string;
  標的名稱: string;
  地址: string;
  管理機關: string;
  活化目標說明: string;
  活化目標類型: string;
  案件狀態: string;
  最新會議結論: string;
  任務總數: number;
  已完成任務數: number;
  建立時間: string;
  更新時間: string;
  meetings: Meeting[];
  tasks: Task[];
}

interface Meeting {
  id: number;
  date: string;
  content: string;
}

interface Task {
  id: number;
  demanding_agencies: string;
  content: string;
  details: string;
  status: string;
  start_date: string;
  end_date: string;
  estimated_completion_date: string;
}

// export default AssetCases;
export const CaseTrackingPage = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from Supabase
  const fetchData = async () => {
    try {
      // Fetch cases from the `asset_cases_view` table
      const { data: caseData, error: caseError } = await supabase
        .from('asset_cases_view')
        .select('*');

      if (caseError) throw caseError;

      // Fetch meetings from the `case_meeting_conclusions` table
      const { data: meetingData, error: meetingError } = await supabase
        .from('case_meeting_conclusions')
        .select('case_id, meeting_date, content');

      if (meetingError) throw meetingError;

      // Fetch tasks from the `case_tasks` table
      const { data: taskData, error: taskError } = await supabase
        .from('case_tasks')
        .select(
          'case_id, id, agency_id, task_content, status, start_date, complete_date, due_date, note'
        );

      if (taskError) throw taskError;

      // Fetch agency names from the `agencies` table
      const { data: agencyData, error: agencyError } = await supabase
        .from('agencies')
        .select('id, name');

      if (agencyError) throw agencyError;

      // Create a lookup map for agency names by ID
      const agencyMap = agencyData.reduce(
        (map, agency) => {
          map[agency.id] = agency.name;
          return map;
        },
        {} as Record<number, string>
      );

      // Merge meetings and tasks into cases
      const mergedCases = caseData.map((caseItem) => ({
        ...caseItem,
        meetings: meetingData
          .filter((meeting) => meeting.case_id === caseItem.案件ID) // Match meetings by `case_id`
          .map((meeting) => ({
            id: meeting.case_id,
            date: meeting.meeting_date,
            content: meeting.content,
          })),
        tasks: taskData
          .filter((task) => task.case_id === caseItem.案件ID) // Match tasks by `case_id`
          .map((task) => ({
            id: task.id,
            demanding_agencies: agencyMap[task.agency_id] || 'Unknown Agency', // Map agency name
            content: task.task_content,
            details: task.note || '', // Optional field
            status: task.status,
            start_date: task.start_date,
            end_date: task.complete_date,
            estimated_completion_date: task.due_date,
          })),
      }));
      setCases(mergedCases);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleSaveCase = () => {
    if (editingCase) {
      const updatedCases = cases.map((c) =>
        c.案件ID === editingCase.案件ID ? editingCase : c
      );
      setCases(updatedCases);
      setSelectedCase(editingCase);
      setEditingCase(null);
    }
  };

  const handleDeleteCase = () => {
    if (selectedCase) {
      const updatedCases = cases.filter(
        (c) => c.案件ID !== selectedCase.案件ID
      );
      setCases(updatedCases);
      setSelectedCase(null);
      setEditingCase(null);
    }
  };

  const handleSaveTask = () => {
    if (editingTask) {
      const updatedCases = cases.map((c) =>
        c.案件ID === selectedCase?.案件ID
          ? {
              ...c,
              tasks: editingTask?.id
                ? c.tasks.map((t) =>
                    t.id === editingTask.id ? editingTask : t
                  )
                : [...c.tasks, { ...editingTask, id: Date.now() }],
            }
          : c
      );
      setCases(updatedCases);
      setSelectedCase(
        updatedCases.find((c) => c.案件ID === selectedCase?.案件ID) ?? null
      );
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedCases = cases.map((c) =>
      c.案件ID === selectedCase?.案件ID
        ? { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) }
        : c
    );
    setCases(updatedCases);
    setSelectedCase(
      updatedCases.find((c) => c.案件ID === selectedCase?.案件ID) ?? null
    );
  };

  const handleNotify = (executiveAgency: string) => {
    alert(`通知已發送至: ${executiveAgency}`);
  };

  const handleExport = (type: string) => {
    alert(`正在匯出 ${type} 文件...`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">案件管理</h1>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Button className="mr-2" onClick={() => handleExport('PDF')}>
            <FileText className="mr-2 h-4 w-4" /> 匯出 PDF
          </Button>
          <Button onClick={() => handleExport('Excel')}>
            <FileSpreadsheet className="mr-2 h-4 w-4" /> 匯出 Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>案件列表</CardTitle>
          <CardDescription>所有正在追蹤的案件</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>案名/用途</TableHead>
                {/* <TableHead>地址、地名</TableHead> */}
                {/* <TableHead>原始用途</TableHead> */}
                <TableHead>活化目標</TableHead>
                <TableHead>媒合狀況</TableHead>
                <TableHead>預計用途</TableHead>
                {/* <TableHead>執行機關</TableHead> */}
                <TableHead>進度</TableHead>
                <TableHead>預計完成時間</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((c) => (
                <TableRow key={c.案件ID}>
                  <TableCell>{c.案件名稱}</TableCell>
                  {/* <TableCell>{c.地址}</TableCell> */}
                  {/* <TableCell>{c.originalUse}</TableCell> */}
                  <TableCell>{c.活化目標說明}</TableCell>
                  <TableCell>{'已媒合'}</TableCell>
                  <TableCell>{c.活化目標類型}</TableCell>
                  {/* <TableCell>{c.管理機關}</TableCell> */}
                  <TableCell>{c.案件狀態}</TableCell>
                  <TableCell>{'2024-12-31'}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="mr-2"
                          onClick={() => {
                            setSelectedCase(c);
                            setEditingCase(null);
                            setEditingTask(null);
                          }}
                        >
                          查看詳情
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>{selectedCase?.案件名稱}</DialogTitle>
                          <DialogDescription>
                            案件詳情、會議紀錄和任務列表
                          </DialogDescription>
                        </DialogHeader>
                        {selectedCase && (
                          <Tabs defaultValue="info" className="w-full">
                            <TabsList className="grid w-1/4 grid-cols-2 border shadow">
                              <TabsTrigger value="info">
                                案件信息和會議紀錄
                              </TabsTrigger>
                              <TabsTrigger value="tasks">任務列表</TabsTrigger>
                            </TabsList>
                            <TabsContent value="info">
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                {Object.entries(selectedCase).map(
                                  ([key, value]) => {
                                    if (
                                      key !== 'id' &&
                                      key !== '案件ID' &&
                                      key !== '' &&
                                      key !== 'meetings' &&
                                      key !== 'tasks' &&
                                      key !== 'lat' &&
                                      key !== 'lng' &&
                                      key !== '任務總數' &&
                                      key !== '已完成任務數' &&
                                      key !== '最新會議結論'
                                    ) {
                                      return (
                                        <div key={key} className="space-y-2">
                                          <Label htmlFor={key}>
                                            {{
                                              name: '案名/用途',
                                              address: '地址、地名',
                                              originalUse: '原始用途',
                                              activationGoal: '活化目標',
                                              matchingStatus: '媒合狀況',
                                              plannedUse: '預計用途',
                                              executiveAgency: '執行機關',
                                              progress: '進度',
                                              estimatedCompletionDate:
                                                '預計完成時間',
                                            }[key] || key}
                                          </Label>
                                          {key === 'plannedUse' ? (
                                            <Select
                                              value={
                                                editingCase
                                                  ? (editingCase[
                                                      key as keyof Case
                                                    ] as string) || ''
                                                  : (value as string) || ''
                                              }
                                              onValueChange={(newValue) =>
                                                setEditingCase(
                                                  (prev) =>
                                                    ({
                                                      ...(prev || selectedCase),
                                                      [key]: newValue,
                                                    }) as Case
                                                )
                                              }
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="選擇用途" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {usageOptions.map((option) => (
                                                  <SelectItem
                                                    key={option}
                                                    value={option}
                                                  >
                                                    {option}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                          ) : (
                                            <Input
                                              id={key}
                                              value={
                                                editingCase
                                                  ? (editingCase[
                                                      key as keyof Case
                                                    ] as string) || ''
                                                  : (value as string) || ''
                                              }
                                              onChange={(e) =>
                                                setEditingCase(
                                                  (prev) =>
                                                    ({
                                                      ...(prev || selectedCase),
                                                      [key]:
                                                        e.target.value || '',
                                                    }) as Case
                                                )
                                              }
                                            />
                                          )}
                                        </div>
                                      );
                                    }
                                  }
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">會議紀錄</h3>
                                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                  {selectedCase.meetings.map((meeting) => (
                                    <div key={meeting.id} className="mb-4">
                                      <p className="font-semibold">
                                        {meeting.date}
                                      </p>
                                      <p className="whitespace-pre-wrap">
                                        {meeting.content}
                                      </p>
                                    </div>
                                  ))}
                                </ScrollArea>
                              </div>
                            </TabsContent>
                            <TabsContent value="tasks">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>執行機關</TableHead>
                                    <TableHead>任務內容</TableHead>
                                    <TableHead>進度</TableHead>
                                    <TableHead>實際開始時間</TableHead>
                                    <TableHead>實際完成時間</TableHead>
                                    <TableHead>預計完成時間</TableHead>
                                    <TableHead>操作</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {selectedCase.tasks.map((task) => (
                                    <TableRow key={task.id}>
                                      <TableCell>
                                        {task.demanding_agencies}
                                      </TableCell>
                                      <TableCell>{task.content}</TableCell>
                                      <TableCell>{task.status}</TableCell>
                                      <TableCell>{task.start_date}</TableCell>
                                      <TableCell>{task.end_date}</TableCell>
                                      <TableCell>
                                        {task.estimated_completion_date}
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setEditingTask(task)}
                                        >
                                          <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            handleDeleteTask(task.id)
                                          }
                                        >
                                          <Trash className="h-4 w-4" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                              {/* <Button className="mt-4" onClick={() => setEditingTask({})}> */}
                              <Button className="mt-4">
                                <Plus className="mr-2 h-4 w-4" /> 新增任務
                              </Button>
                              {editingTask && (
                                <div className="mt-4 space-y-4">
                                  <h3 className="font-semibold">
                                    {editingTask.id ? '編輯任務' : '新增任務'}
                                  </h3>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="task-agency">
                                        執行機關
                                      </Label>
                                      <Input
                                        id="task-agency"
                                        value={
                                          editingTask?.demanding_agencies || ''
                                        }
                                        onChange={(e) =>
                                          setEditingTask({
                                            ...editingTask,
                                            demanding_agencies:
                                              e.target.value || '',
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="task-content">
                                        任務內容
                                      </Label>
                                      <Input
                                        id="task-content"
                                        value={editingTask?.content || ''}
                                        onChange={(e) =>
                                          setEditingTask({
                                            ...editingTask,
                                            content: e.target.value || '',
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="task-progress">
                                        進度
                                      </Label>
                                      <Input
                                        id="task-progress"
                                        value={editingTask?.status || ''}
                                        onChange={(e) =>
                                          setEditingTask({
                                            ...editingTask,
                                            status: e.target.value || '',
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="task-start">
                                        實際開始時間
                                      </Label>
                                      <Input
                                        type="date"
                                        id="task-start"
                                        value={editingTask?.start_date || ''}
                                        onChange={(e) =>
                                          setEditingTask({
                                            ...editingTask,
                                            start_date: e.target.value || '',
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="task-end">
                                        實際完成時間
                                      </Label>
                                      <Input
                                        type="date"
                                        id="task-end"
                                        value={editingTask?.end_date || ''}
                                        onChange={(e) =>
                                          setEditingTask({
                                            ...editingTask,
                                            end_date: e.target.value || '',
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="task-estimated">
                                        預計完成時間
                                      </Label>
                                      <Input
                                        type="date"
                                        id="task-estimated"
                                        value={
                                          editingTask?.estimated_completion_date ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          setEditingTask({
                                            ...editingTask,
                                            estimated_completion_date:
                                              e.target.value || '',
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <Button onClick={handleSaveTask}>
                                    {editingTask.id ? '更新任務' : '新增任務'}
                                  </Button>
                                </div>
                              )}
                            </TabsContent>
                          </Tabs>
                        )}
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedCase(null)}
                          >
                            離開
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleDeleteCase}
                          >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            刪除此案件
                          </Button>
                          <Button onClick={handleSaveCase}>保存</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
