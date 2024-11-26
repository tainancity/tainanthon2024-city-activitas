"use client"
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://xnlamjezlrbklvedlmwo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhubGFtamV6bHJia2x2ZWRsbXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MTAwMzQsImV4cCI6MjA0NTQ4NjAzNH0.vV704jxQRAbHQ5PCZCcfYKnaM1NuTp5LJSB9nt329z8';
export const supabase = createClient(supabaseUrl, supabaseKey);
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, FileText, FileSpreadsheet, Mail, AlertTriangle, Plus, Pencil, Trash } from "lucide-react"
import Link from 'next/link'

const usageOptions = [
  "育成與創業空間",
  "公共休憩空間",
  "文化資產與古蹟活化",
  "訓練設施",
  "社會福利與照顧設施",
  "商業進駐",
  "消防與警察設施",
  "行政設施"
]
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



export const AssetCases = () => {
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

// const useEffect(() => {
    // Fetch data from Supabase
    const fetchData = async () => {
    const { data, error } = await supabase
        .from('asset_cases_view')
        .select('*');

    if (error) {
        setError(error.message);
    } else {
        setCases(data);
    }
    setLoading(false);
    };

    fetchData();
// }, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

return (
    <div>
    <h1>Asset Cases</h1>
    {cases.map((caseItem) => (
        <div key={caseItem.案件ID}>
        <h2>{caseItem.案件名稱}</h2>
        <p>{caseItem.地址}</p>
        <p>{caseItem.案件狀態}</p>
        {/* Add more case details here */}
        </div>
    ))}
    </div>
);
};

// export default AssetCases;
export const CaseTrackingPage = () => {
    // const [cases, setCases] = useState<Case[]>([
    //     {
    //       案件ID: 1,
    //       案件名稱: "玉井區公共休憩空間",
    //       資產類型: "不動產",
    //       行政區: "臺南市玉井區",
    //       標的名稱: "玉井游泳池原室內空間",
    //       地址: "臺南市玉井區中山路",
    //       管理機關: "工務局、體育局、玉井區公所",
    //       活化目標說明: "提供公共休憩空間，並規劃體健設施作為地方活動空間。",
    //       活化目標類型: "公共休憩空間",
    //       案件狀態: "核准經費中",
    //       最新會議結論: "1. 玉井游泳池原室內空間：\n(1)後續發包修繕請公所評估放置體健設施作為地方活動空間之可行性，並請體育局協助相關經費。\n(2)耐震評估及補強相關經費請工務局協助。\n2. 玉井體育公園：請玉井區公所注意後續維護管理，避免雜草叢生，經費部分請體育局協助，並儘速辦理。",
    //       任務總數: 3,
    //       已完成任務數: 0,
    //       建立時間: "2023-01-01",
    //       更新時間: "2023-10-01",
    //       meetings: [
    //         {
    //           id: 1,
    //           date: "2023-10-01",
    //           content:
    //             "1. 玉井游泳池原室內空間：\n(1)後續發包修繕請公所評估放置體健設施作為地方活動空間之可行性，並請體育局協助相關經費。\n(2)耐震評估及補強相關經費請工務局協助。\n2. 玉井體育公園：請玉井區公所注意後續維護管理，避免雜草叢生，經費部分請體育局協助，並儘速辦理。",
    //         },
    //       ],
    //       tasks: [
    //         {
    //           id: 1,
    //           demanding_agencies: "工務局",
    //           content: "協助耐震評估及補強相關經費",
    //           details: "",
    //           status: "進行中",
    //           start_date: "2024-07-31",
    //           end_date: "2024-07-27",
    //           estimated_completion_date: "2024-07-27",
    //         },
    //         {
    //           id: 2,
    //           demanding_agencies: "體育局",
    //           content: "協助發包修繕相關經費",
    //           details: "",
    //           status: "待處理",
    //           start_date: "2024-07-02",
    //           end_date: "2024-08-31",
    //           estimated_completion_date: "2024-09-20",
    //         },
    //         {
    //           id: 3,
    //           demanding_agencies: "玉井區公所",
    //           content: "請公所評估放置體健設施作為地方活動空間之可行性",
    //           details: "",
    //           status: "待處理",
    //           start_date: "2024-09-03",
    //           end_date: "2024-09-28",
    //           estimated_completion_date: "2024-10-18",
    //         },
    //       ],
    //     },
    //     {
    //       案件ID: 2,
    //       案件名稱: "安平區商業進駐",
    //       資產類型: "不動產",
    //       行政區: "臺南市安平區",
    //       標的名稱: "安平區安北路商業區",
    //       地址: "臺南市安平區安北路",
    //       管理機關: "觀光旅遊局",
    //       活化目標說明: "招商並規劃商業進駐，提升地區經濟活力。",
    //       活化目標類型: "商業進駐",
    //       案件狀態: "完成招商",
    //       最新會議結論: "完成招商並處理後續相關事宜，等待訴訟結束後進行交接。",
    //       任務總數: 1,
    //       已完成任務數: 0,
    //       建立時間: "2024-01-01",
    //       更新時間: "2024-10-02",
    //       meetings: [],
    //       tasks: [
    //         {
    //           id: 1,
    //           demanding_agencies: "觀光旅遊局",
    //           content: "於前案訴訟期間先辦理後續招商，俟訴訟完後即可點交，並研議招商適宜之年限，俾利廠商做資本性投入",
    //           details: "",
    //           status: "待處理",
    //           start_date: "2024-10-02",
    //           end_date: "2024-10-10",
    //           estimated_completion_date: "2024-10-26",
    //         },
    //       ],
    //     },
    //   ]);
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

// const useEffect(() => {
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
            .select('case_id, id, agency_id, task_content, status, start_date, complete_date, due_date, note');
            if (taskError) throw taskError;

            // Merge meetings into cases
            const mergedCases = caseData.map((caseItem) => {
              return {
                ...caseItem,
                meetings: meetingData
                  .filter((meeting) => meeting.case_id === caseItem.案件ID) // Match meetings to the correct case by `case_id`
                  .map((meeting) => ({
                    id: meeting.case_id, // Adjust fields based on your Meeting interface
                    date: meeting.meeting_date,
                    content: meeting.content,
                  })),
                tasks: taskData
                  .filter((task) => task.case_id === caseItem.案件ID) // Match tasks to the correct case by `case_id`
                  .map((task) => ({
                    id: task.id,
                    demanding_agencies: task.agency_id.toString(), // Assuming `agency_id` maps to an agency name elsewhere
                    content: task.task_content,
                    details: task.note || '', // Optional field
                    status: task.status,
                    start_date: task.start_date,
                    end_date: task.complete_date,
                    estimated_completion_date: task.due_date,
                  })),
              };
            });

            setCases(mergedCases);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
    };

    fetchData();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [editingCase, setEditingCase] = useState<Case | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleSaveCase = () => {
    if (editingCase) {
      const updatedCases = cases.map(c =>
        c.案件ID === editingCase.案件ID ? editingCase : c
      )
      setCases(updatedCases)
      setSelectedCase(editingCase)
      setEditingCase(null)
    }
  }

  const handleDeleteCase = () => {
    if (selectedCase) {
      const updatedCases = cases.filter(c => c.案件ID !== selectedCase.案件ID)
      setCases(updatedCases)
      setSelectedCase(null)
      setEditingCase(null)
    }
  }

  const handleSaveTask = () => {
    if (editingTask) {
      const updatedCases = cases.map(c =>
        c.案件ID === selectedCase?.案件ID
          ? {
              ...c,
              tasks: editingTask?.id
                ? c.tasks.map(t => t.id === editingTask.id ? editingTask : t)
                : [...c.tasks, { ...editingTask, id: Date.now() }]
            }
          : c
      )
      setCases(updatedCases)
      setSelectedCase(updatedCases.find(c => c.案件ID === selectedCase?.案件ID)?? null)
      setEditingTask(null)
    }
  }

  const handleDeleteTask = (taskId: number) => {
    const updatedCases = cases.map(c =>
      c.案件ID === selectedCase?.案件ID
        ? { ...c, tasks: c.tasks.filter(t => t.id !== taskId) }
        : c
    )
    setCases(updatedCases)
    setSelectedCase(updatedCases.find(c => c.案件ID === selectedCase?.案件ID)??null)
  }

  const handleNotify = (executiveAgency: string) => {
    alert(`通知已發送至: ${executiveAgency}`)
  }

  const handleExport = (type: string) => {
    alert(`正在匯出 ${type} 文件...`)
  }

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
                  <TableCell>{"已媒合"}</TableCell>
                  <TableCell>{c.活化目標類型}</TableCell>
                  {/* <TableCell>{c.管理機關}</TableCell> */}
                  <TableCell>{c.案件狀態}</TableCell>
                  <TableCell>{"2024-12-31"}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="mr-2" onClick={() => {
                          setSelectedCase(c)
                          setEditingCase(null)
                          setEditingTask(null)
                        }}>
                          查看詳情
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>{selectedCase?.案件名稱}</DialogTitle>
                          <DialogDescription>案件詳情、會議紀錄和任務列表</DialogDescription>
                        </DialogHeader>
                        {selectedCase && (
                          <Tabs defaultValue="info" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="info">案件信息和會議紀錄</TabsTrigger>
                              <TabsTrigger value="tasks">任務列表</TabsTrigger>
                            </TabsList>
                            <TabsContent value="info">
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                {Object.entries(selectedCase).map(([key, value]) => {
                                  if (key !== 'id' && key !== 'meetings' && key !== 'tasks' && key !== 'lat' && key !== 'lng' && key !== '任務總數' && key !== '已完成任務數') {
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
                                            estimatedCompletionDate: '預計完成時間'
                                          }[key] || key}
                                        </Label>
                                        {key === 'plannedUse' ? (
                                            <Select
                                            value={editingCase ? (editingCase[key as keyof Case] as string) || "" : (value as string) || ""}
                                            onValueChange={(newValue) =>
                                              setEditingCase((prev) => ({
                                                ...(prev || selectedCase),
                                                [key]: newValue,
                                              } as Case))
                                            }
                                            >
                                            <SelectTrigger>
                                              <SelectValue placeholder="選擇用途" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {usageOptions.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                  {option}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        ) : (
                                            <Input
                                                id={key}
                                                value={editingCase ? (editingCase[key as keyof Case] as string) || "" : (value as string) || ""}
                                                onChange={(e) =>
                                                    setEditingCase((prev) => ({
                                                    ...(prev || selectedCase),
                                                    [key]: e.target.value || "",
                                                    } as Case))
                                                }
                                                />
                                        )}
                                      </div>
                                    )
                }
                                })}
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">會議紀錄</h3>
                                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                  {selectedCase.meetings.map((meeting) => (
                                    <div key={meeting.id} className="mb-4">
                                      <p className="font-semibold">{meeting.date}</p>
                                      <p className="whitespace-pre-wrap">{meeting.content}</p>
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
                                      <TableCell>{task.demanding_agencies}</TableCell>
                                      <TableCell>{task.content}</TableCell>
                                      <TableCell>{task.status}</TableCell>
                                      <TableCell>{task.start_date}</TableCell>
                                      <TableCell>{task.end_date}</TableCell>
                                      <TableCell>{task.estimated_completion_date}</TableCell>
                                      <TableCell>
                                        <Button variant="ghost" size="sm" onClick={() => setEditingTask(task)}>
                                          <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
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
                                  <h3 className="font-semibold">{editingTask.id ? '編輯任務' : '新增任務'}</h3>
                                  <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="task-agency">執行機關</Label>
                                    <Input
                                        id="task-agency"
                                        value={editingTask?.demanding_agencies || ""}
                                        onChange={(e) =>
                                        setEditingTask({ ...editingTask, demanding_agencies: e.target.value || "" })
                                        }
                                    />
                                    </div>
                                    <div className="space-y-2">
                                    <Label htmlFor="task-content">任務內容</Label>
                                    <Input
                                        id="task-content"
                                        value={editingTask?.content || ""}
                                        onChange={(e) =>
                                        setEditingTask({ ...editingTask, content: e.target.value || "" })
                                        }
                                    />
                                    </div>
                                    <div className="space-y-2">
                                    <Label htmlFor="task-progress">進度</Label>
                                    <Input
                                        id="task-progress"
                                        value={editingTask?.status || ""}
                                        onChange={(e) =>
                                        setEditingTask({ ...editingTask, status: e.target.value || "" })
                                        }
                                    />
                                    </div>
                                    <div className="space-y-2">
                                    <Label htmlFor="task-start">實際開始時間</Label>
                                    <Input
                                        type="date"
                                        id="task-start"
                                        value={editingTask?.start_date || ""}
                                        onChange={(e) =>
                                        setEditingTask({ ...editingTask, start_date: e.target.value || "" })
                                        }
                                    />
                                    </div>
                                    <div className="space-y-2">
                                    <Label htmlFor="task-end">實際完成時間</Label>
                                    <Input
                                        type="date"
                                        id="task-end"
                                        value={editingTask?.end_date || ""}
                                        onChange={(e) =>
                                        setEditingTask({ ...editingTask, end_date: e.target.value || "" })
                                        }
                                    />
                                    </div>
                                    <div className="space-y-2">
                                    <Label htmlFor="task-estimated">預計完成時間</Label>
                                    <Input
                                        type="date"
                                        id="task-estimated"
                                        value={editingTask?.estimated_completion_date || ""}
                                        onChange={(e) =>
                                        setEditingTask({
                                            ...editingTask,
                                            estimated_completion_date: e.target.value || "",
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
                          <Button variant="outline" onClick={() => setSelectedCase(null)}>離開</Button>
                          <Button variant="destructive" onClick={handleDeleteCase}>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            刪除此案件
                          </Button>
                          <Button onClick={handleSaveCase}>保存</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {/* <Button variant="outline" onClick={() => handleNotify(c.executiveAgency)}>
                      <Mail className="mr-2 h-4 w-4" /> 通知
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}