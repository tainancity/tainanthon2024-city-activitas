'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Phone, Mail, AlertTriangle, Bell, Save } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// 模擬資料
const departments = ['文化局', '工務局', '社會局', '觀光旅遊局', '警察局'];
const statuses = ['待處理', '進行中', '已完成'];
const tags = ['運動設施', '進行中', '招商', '修繕'];

export const ProgressTrackingPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: '協助耐震評估及補強相關經費',
      department: '文化局',
      caseName: '臺南市玉井游泳池',
      description: '臺南市玉井游泳池耐震評估及補強工程',
      assignee: '王大明',
      contact: '李經理',
      startDate: '2024-05-11',
      endDate: '',
      dueDate: '2024-11-11',
      status: '進行中',
      tags: ['運動設施', '進行中'],
      details:
        '這是細節你知道的這是細節你知道的這是細節你知道的這是細節你知道的',
      contactRecords: [
        {
          date: '2024-09-20',
          method: '電話',
          person: '李經理',
          notes: '無回應，預計下週再聯絡',
        },
        {
          date: '2024-10-25',
          method: '電子郵件',
          person: '張主任',
          notes: '已確認進度，無需跟進',
        },
      ],
    },
    {
      id: 2,
      title: '正式營運',
      department: '文化局',
      caseName: '臺南市安平國家歷史風景園區',
      description: '歷史水景公園條例修訂完成',
      assignee: '李小明',
      status: '待處理',
      dueDate: '2024-08-31',
      lastUpdated: '2024-05-07',
      tags: ['修繕'],
    },
    {
      id: 3,
      title: '整備修繕工程中',
      department: '社會局',
      caseName: '中西區雙園里活動中心',
      description: '社會福利服務中心及身障日間作業服務設施',
      assignee: 'WK',
      status: '進行中',
      dueDate: '2024-08-31',
      lastUpdated: '2024-05-07',
      tags: ['修繕', '進行中'],
    },
  ]);

  const [filters, setFilters] = useState({
    caseName: '',
    department: '',
    tag: '',
    assignee: '',
    startDate: '',
    endDate: '',
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [showReminder, setShowReminder] = useState(false);
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    department: '',
    caseName: '',
    description: '',
    assignee: '',
    contact: '',
    startDate: '',
    endDate: '',
    dueDate: '',
    status: '待處理',
    tags: [],
    details: '',
  });

  // 篩選任務
  const filteredTasks = tasks.filter((task) => {
    return (
      (!filters.caseName ||
        task.caseName
          ?.toLowerCase()
          .includes(filters.caseName.toLowerCase())) &&
      (!filters.department || task.department === filters.department) &&
      (!filters.tag || task.tags?.includes(filters.tag)) &&
      (!filters.assignee ||
        task.assignee
          ?.toLowerCase()
          .includes(filters.assignee.toLowerCase())) &&
      (!filters.startDate ||
        new Date(task.dueDate) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(task.dueDate) <= new Date(filters.endDate))
    );
  });

  // 根據狀態分組任務
  const todoTasks = filteredTasks.filter((task) => task.status === '待處理');
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === '進行中'
  );
  const doneTasks = filteredTasks.filter((task) => task.status === '已完成');

  const { toast } = useToast();

  // 1. 定期彈出提醒
  useEffect(() => {
    const interval = setInterval(() => {
      toast({
        title: '記得更新您的任務卡片！',
        description: '定期更新有助於團隊了解專案進度。',
        action: <Button size="sm">查看任務</Button>,
      });
    }, 3600000); // 每小時提醒一次

    return () => clearInterval(interval);
  }, []);

  // 2. 未完成任務提醒
  useEffect(() => {
    const incompleteTasks = tasks.filter((task) => task.status !== '已完成');
    if (incompleteTasks.length > 0) {
      setShowReminder(true);
    }
  }, [tasks]);

  // 3. 任務截止日期提醒
  useEffect(() => {
    const checkDueDates = () => {
      const today = new Date();
      const nearDueTasks = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        const timeDiff = dueDate.getTime() - today.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff <= 7 && daysDiff > 0 && task.status !== '已完成';
      });

      if (nearDueTasks.length > 0) {
        toast({
          title: '任務即將到期！',
          description: `您有 ${nearDueTasks.length} 個任務在一週內到期。`,
          action: <Button size="sm">查看任務</Button>,
        });
      }
    };

    checkDueDates();
    const interval = setInterval(checkDueDates, 86400000); // 每天檢查一次

    return () => clearInterval(interval);
  }, [tasks]);

  const handleInputChange = (field, value) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewTaskInputChange = (field, value) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
    setSelectedTask(editedTask);
    toast({
      title: '任務已更新',
      description: '您的更改已成功保存。',
    });
  };

  const handleCreateNewTask = () => {
    const newTaskWithId = { ...newTask, id: tasks.length + 1 };
    setTasks((prevTasks) => [...prevTasks, newTaskWithId]);
    setShowNewTaskDialog(false);
    setNewTask({
      title: '',
      department: '',
      caseName: '',
      description: '',
      assignee: '',
      contact: '',
      startDate: '',
      endDate: '',
      dueDate: '',
      status: '待處理',
      tags: [],
      details: '',
    });
    toast({
      title: '新任務已創建',
      description: '新的任務卡片已成功添加。',
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${year}/${month}/${day}`;
  };

  const TaskCard = ({ task }) => (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{task.department}</Badge>
          <Avatar className="h-8 w-12">
            <AvatarFallback>{task.assignee}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-base mt-2">{task.title}</CardTitle>
        <CardDescription className="text-sm">
          {task.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <div className="flex flex-col w-full">
          <div className="flex gap-2">
            {task.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
            <span>截止日期: {formatDate(task.dueDate)}</span>
            <span>上次更新: {formatDate(task.lastUpdated)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">進度追蹤</h1>
        <div className="text-muted-foreground">
          媒合中資產{' '}
          <span className="text-4xl font-bold ml-2"> {tasks.length}</span>
        </div>
      </div>

      {/* 4. 主頁面上的任務統計和提示 */}
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>任務提醒</AlertTitle>
        <AlertDescription>
          您目前有 {todoTasks.length} 個待處理任務，{inProgressTasks.length}{' '}
          個進行中任務。 請記得定期更新您的任務卡片！
        </AlertDescription>
      </Alert>

      {/* 2. 未完成任務提醒 */}
      {showReminder && (
        <Alert className="mb-6">
          <Bell className="h-4 w-4" />
          <AlertTitle>未完成任務提醒</AlertTitle>
          <AlertDescription>
            您有未完成的任務。請盡快處理並更新任務狀態！
          </AlertDescription>
        </Alert>
      )}

      {/* 篩選區 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">篩選功能</CardTitle>
          <CardDescription>
            篩選案件, tags, 負責人, 單位, 日期等
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <Label htmlFor="caseName">案件名稱</Label>
              <Input
                id="caseName"
                value={filters.caseName}
                onChange={(e) =>
                  setFilters({ ...filters, caseName: e.target.value })
                }
                placeholder="搜尋案件名稱"
              />
            </div>
            <div>
              <Label htmlFor="department">單位</Label>
              <Select
                value={filters.department}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    department: value === 'all' ? '' : value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇單位" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tag">標籤</Label>
              <Select
                value={filters.tag}
                onValueChange={(value) =>
                  setFilters({ ...filters, tag: value === 'all' ? '' : value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇標籤" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  {tags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="assignee">負責人</Label>
              <Input
                id="assignee"
                value={filters.assignee}
                onChange={(e) =>
                  setFilters({ ...filters, assignee: e.target.value })
                }
                placeholder="搜尋負責人"
              />
            </div>
            <div>
              <Label htmlFor="startDate">開始日期</Label>
              <Input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="endDate">結束日期</Label>
              <Input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 看板區 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['待處理', '進行中', '已完成'].map((status) => (
          <div key={status}>
            <h2 className="text-lg font-semibold mb-4">{status}</h2>
            {filteredTasks
              .filter((task) => task.status === status)
              .map((task) => (
                <Dialog key={task.id}>
                  <DialogTrigger asChild>
                    <div
                      onClick={() => {
                        setSelectedTask(task);
                        setEditedTask(task);
                      }}
                      className="cursor-pointer"
                    >
                      <TaskCard task={task} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[800px]">
                    <DialogHeader>
                      <DialogTitle>{editedTask?.title}</DialogTitle>
                      <DialogDescription>任務詳情</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>案名</Label>
                            <Input
                              value={editedTask?.caseName}
                              onChange={(e) =>
                                handleInputChange('caseName', e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <Label>負責人</Label>
                            <Input
                              value={editedTask?.assignee}
                              onChange={(e) =>
                                handleInputChange('assignee', e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <Label>執行機關</Label>
                            <Select
                              value={editedTask?.department}
                              onValueChange={(value) =>
                                handleInputChange('department', value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="選擇單位" />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem key={dept} value={dept}>
                                    {dept}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>聯絡窗口</Label>
                            <Input
                              value={editedTask?.contact}
                              onChange={(e) =>
                                handleInputChange('contact', e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>實際開始時間</Label>
                            <Input
                              type="date"
                              value={editedTask?.startDate}
                              onChange={(e) =>
                                handleInputChange('startDate', e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <Label>實際完成時間</Label>
                            <Input
                              type="date"
                              value={editedTask?.endDate}
                              onChange={(e) =>
                                handleInputChange('endDate', e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <Label>到期日</Label>
                            <Input
                              type="date"
                              value={editedTask?.dueDate}
                              onChange={(e) =>
                                handleInputChange('dueDate', e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <Label>執行細節</Label>
                          <Textarea
                            value={editedTask?.details}
                            onChange={(e) =>
                              handleInputChange('details', e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label>Tag</Label>
                          <div className="flex gap-2 mt-2">
                            {editedTask?.tags?.map((tag, index) => (
                              <Badge key={index} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>聯絡紀錄</Label>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>日期</TableHead>
                                <TableHead>聯絡方式</TableHead>
                                <TableHead>聯絡人</TableHead>
                                <TableHead>備註</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {editedTask?.contactRecords?.map(
                                (record, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{record.date}</TableCell>
                                    <TableCell>
                                      {record.method === '電話' ? (
                                        <Phone className="h-4 w-4 inline-block mr-2" />
                                      ) : (
                                        <Mail className="h-4 w-4 inline-block mr-2" />
                                      )}
                                      {record.method}
                                    </TableCell>
                                    <TableCell>{record.person}</TableCell>
                                    <TableCell>{record.notes}</TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        保存更改
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
            <Dialog
              open={showNewTaskDialog}
              onOpenChange={setShowNewTaskDialog}
            >
              <DialogTrigger asChild>
                <Button variant="ghost" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  新增卡片
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>新增任務</DialogTitle>
                  <DialogDescription>請填寫新任務的詳細信息</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>案名</Label>
                      <Input
                        value={newTask.caseName}
                        onChange={(e) =>
                          handleNewTaskInputChange('caseName', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>負責人</Label>
                      <Input
                        value={newTask.assignee}
                        onChange={(e) =>
                          handleNewTaskInputChange('assignee', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>執行機關</Label>
                      <Select
                        value={newTask.department}
                        onValueChange={(value) =>
                          handleNewTaskInputChange('department', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="選擇單位" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>聯絡窗口</Label>
                      <Input
                        value={newTask.contact}
                        onChange={(e) =>
                          handleNewTaskInputChange('contact', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>實際開始時間</Label>
                      <Input
                        type="date"
                        value={newTask.startDate}
                        onChange={(e) =>
                          handleNewTaskInputChange('startDate', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>實際完成時間</Label>
                      <Input
                        type="date"
                        value={newTask.endDate}
                        onChange={(e) =>
                          handleNewTaskInputChange('endDate', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>到期日</Label>
                      <Input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) =>
                          handleNewTaskInputChange('dueDate', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label>執行細節</Label>
                    <Textarea
                      value={newTask.details}
                      onChange={(e) =>
                        handleNewTaskInputChange('details', e.target.value)
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateNewTask}>
                    <Save className="mr-2 h-4 w-4" />
                    創建新任務
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};
