"use client"

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


// export default function CaseTrackingPage() {
export const CaseTrackingPage = () => {
// Define the Case type
interface Case {
    id: number;
    asset_id: number;
    year: number;
    location: string;
    is_supplementary: boolean;
    supplementary_year: number | null;
    usage_plan: string;
    usage_type_id: number;
    land_value: number;
    building_value: number;
    benefit_value: number;
    is_counted: boolean;
    note: string;
    status: string;
    start_date: string;
    end_date: string;
    demanding_agencies: string;
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

  const [cases, setCases] = useState<Case[]>([
    {
      id: 1,
      asset_id: 101,
      year: 2023,
      location: "臺南市玉井區中山路",
      is_supplementary: false,
      supplementary_year: null,
      usage_plan: "公共休憩空間",
      usage_type_id: 1,
      land_value: 500000,
      building_value: 1200000,
      benefit_value: 800000,
      is_counted: true,
      note: "核准經費中",
      status: "核准經費中",
      start_date: "2023-01-01",
      end_date: "2023-12-16",
      demanding_agencies: "工務局、體育局、玉井區公所",
      meetings: [
        {
          id: 1,
          date: "2023-10-01",
          content:
            "1. 玉井游泳池原室內空間：\n(1)後續發包修繕請公所評估放置體健設施作為地方活動空間之可行性，並請體育局協助相關經費。\n(2)耐震評估及補強相關經費請工務局協助。\n2. 玉井體育公園：請玉井區公所注意後續維護管理，避免雜草叢生，經費部分請體育局協助，並儘速辦理。",
        },
      ],
      tasks: [
        {
          id: 1,
          demanding_agencies: "工務局",
          content: "協助耐震評估及補強相關經費",
          details: "",
          status: "進行中",
          start_date: "2024-07-31",
          end_date: "2024-07-27",
          estimated_completion_date: "2024-07-27",
        },
        {
          id: 2,
          demanding_agencies: "體育局",
          content: "協助發包修繕相關經費",
          details: "",
          status: "待處理",
          start_date: "2024-07-02",
          end_date: "2024-08-31",
          estimated_completion_date: "2024-09-20",
        },
        {
          id: 3,
          demanding_agencies: "玉井區公所",
          content: "請公所評估放置體健設施作為地方活動空間之可行性",
          details: "",
          status: "待處理",
          start_date: "2024-09-03",
          end_date: "2024-09-28",
          estimated_completion_date: "2024-10-18",
        },
      ],
    },
    {
      id: 2,
      asset_id: 102,
      year: 2024,
      location: "臺南市安平區安北路",
      is_supplementary: true,
      supplementary_year: 2023,
      usage_plan: "商業進駐",
      usage_type_id: 2,
      land_value: 2000000,
      building_value: 5000000,
      benefit_value: 3000000,
      is_counted: true,
      note: "完成招商",
      status: "完成招商",
      start_date: "2024-01-01",
      end_date: "2024-08-31",
      demanding_agencies: "觀光旅遊局",
      meetings: [],
      tasks: [
        {
          id: 1,
          demanding_agencies: "觀光旅遊局",
          content: "於前案訴訟期間先辦理後續招商，俟訴訟完後即可點交，並研議招商適宜之年限，俾利廠商做資本性投入",
          details: "",
          status: "待處理",
          start_date: "2024-10-02",
          end_date: "2024-10-10",
          estimated_completion_date: "2024-10-26",
        },
      ],
    },
  ]);


  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [editingCase, setEditingCase] = useState<Case | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleSaveCase = () => {
    if (editingCase) {
      const updatedCases = cases.map(c =>
        c.id === editingCase.id ? editingCase : c
      )
      setCases(updatedCases)
      setSelectedCase(editingCase)
      setEditingCase(null)
    }
  }

  const handleDeleteCase = () => {
    if (selectedCase) {
      const updatedCases = cases.filter(c => c.id !== selectedCase.id)
      setCases(updatedCases)
      setSelectedCase(null)
      setEditingCase(null)
    }
  }

  const handleSaveTask = () => {
    if (editingTask) {
      const updatedCases = cases.map(c =>
        c.id === selectedCase?.id
          ? {
              ...c,
              tasks: editingTask.id
                ? c.tasks.map(t => t.id === editingTask.id ? editingTask : t)
                : [...c.tasks, { ...editingTask, id: Date.now() }]
            }
          : c
      )
      setCases(updatedCases)
      setSelectedCase(updatedCases.find(c => c.id === selectedCase?.id)?? null)
      setEditingTask(null)
    }
  }

  const handleDeleteTask = (taskId: number) => {
    const updatedCases = cases.map(c =>
      c.id === selectedCase?.id
        ? { ...c, tasks: c.tasks.filter(t => t.id !== taskId) }
        : c
    )
    setCases(updatedCases)
    setSelectedCase(updatedCases.find(c => c.id === selectedCase?.id)??null)
  }

  const handleNotify = (executiveAgency: string) => {
    alert(`通知已發送至: ${executiveAgency}`)
  }

  const handleExport = (type: string) => {
    alert(`正在匯出 ${type} 文件...`)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">案件進度追蹤</h1>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Button className="mr-2" onClick={() => handleExport('PDF')}>
            <FileText className="mr-2 h-4 w-4" /> 匯出 PDF
          </Button>
          <Button onClick={() => handleExport('Excel')}>
            <FileSpreadsheet className="mr-2 h-4 w-4" /> 匯出 Excel
          </Button>
        </div>
        <Link href="/progress-tracking">
          <Button>
            查看進度追蹤
          </Button>
        </Link>
      </div>
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>案件地圖</CardTitle>
            <CardDescription>案件位置概覽</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">此處應為地圖組件</p>
              {cases.map((c) => (
                <div key={c.id} className="absolute" style={{left: `${c.lng}px`, top: `${c.lat}px`}}>
                  <MapPin className="text-red-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
                <TableHead>地址、地名</TableHead>
                <TableHead>原始用途</TableHead>
                <TableHead>活化目標</TableHead>
                <TableHead>媒合狀況</TableHead>
                <TableHead>預計用途</TableHead>
                <TableHead>執行機關</TableHead>
                <TableHead>進度</TableHead>
                <TableHead>預計完成時間</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.address}</TableCell>
                  <TableCell>{c.originalUse}</TableCell>
                  <TableCell>{c.activationGoal}</TableCell>
                  <TableCell>{c.matchingStatus}</TableCell>
                  <TableCell>{c.plannedUse}</TableCell>
                  <TableCell>{c.executiveAgency}</TableCell>
                  <TableCell>{c.progress}</TableCell>
                  <TableCell>{c.estimatedCompletionDate}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="mr-2" onClick={() => {
                          setSelectedCase(null)
                          setEditingCase(null)
                          setEditingTask(null)
                        }}>
                          查看詳情
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>{selectedCase?.name}</DialogTitle>
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
                                  if (key !== 'id' && key !== 'meetings' && key !== 'tasks' && key !== 'lat' && key !== 'lng') {
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
                                            value={editingCase ? (editingCase[key as keyof Case] as string) : (value as string)}
                                                onValueChange={(newValue) =>
                                                    setEditingCase((prev) => ({
                                                    ...(prev || selectedCase),
                                                    [key]: newValue
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
                                            value={editingCase ? (editingCase[key as keyof Case] as string) : (value as string)}
                                            onChange={(e) =>
                                              setEditingCase((prev) => ({
                                                ...(prev || selectedCase),
                                                [key]: e.target.value
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
                                      <TableCell>{task.executiveAgency}</TableCell>
                                      <TableCell>{task.content}</TableCell>
                                      <TableCell>{task.progress}</TableCell>
                                      <TableCell>{task.actualStartDate}</TableCell>
                                      <TableCell>{task.actualEndDate}</TableCell>
                                      <TableCell>{task.estimatedEndDate}</TableCell>
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
                              <Button className="mt-4">
                              {/* <Button className="mt-4" onClick={() => setEditingTask({})}> */}
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
                                        value={editingTask.executiveAgency || ''}
                                        onChange={(e) => setEditingTask({...editingTask, executiveAgency: e.target.value})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="task-content">任務內容</Label>
                                      <Input
                                        id="task-content"
                                        value={editingTask.content || ''}
                                        onChange={(e) => setEditingTask({...editingTask, content: e.target.value})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="task-progress">進度</Label>
                                      <Input
                                        id="task-progress"
                                        value={editingTask.progress || ''}
                                        onChange={(e) => setEditingTask({...editingTask, progress: e.target.value})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="task-start">實際開始時間</Label>
                                      <Input
                                        type="date"
                                        id="task-start"
                                        value={editingTask.actualStartDate || ''}
                                        onChange={(e) => setEditingTask({...editingTask, actualStartDate: e.target.value})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="task-end">實際完成時間</Label>
                                      <Input
                                        type="date"
                                        id="task-end"
                                        value={editingTask.actualEndDate || ''}
                                        onChange={(e) => setEditingTask({...editingTask, actualEndDate: e.target.value})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="task-estimated">預計完成時間</Label>
                                      <Input
                                        type="date"
                                        id="task-estimated"
                                        value={editingTask.estimatedEndDate || ''}
                                        onChange={(e) => setEditingTask({...editingTask, estimatedEndDate: e.target.value})}
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
                    <Button variant="outline" onClick={() => handleNotify(c.executiveAgency)}>
                      <Mail className="mr-2 h-4 w-4" /> 通知
                    </Button>
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