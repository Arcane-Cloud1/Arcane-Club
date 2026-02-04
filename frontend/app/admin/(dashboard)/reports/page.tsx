"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("PENDING");

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/reports", {
        params: {
          page,
          limit: 10,
          status: statusFilter === "ALL" ? undefined : statusFilter,
        },
      });
      if (res.data.success) {
        setReports(res.data.data?.reports || []);
        setTotalPages(res.data.data?.pagination?.totalPages || 1);
      }
    } catch (error) {
      toast.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [page, statusFilter]);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await api.patch(`/admin/reports/${id}/status`, { status });
      toast.success("Report status updated");
      fetchReports();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">举报管理</h1>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">状态筛选:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">全部</SelectItem>
                    <SelectItem value="PENDING">待处理</SelectItem>
                    <SelectItem value="RESOLVED">已处理</SelectItem>
                    <SelectItem value="IGNORED">已忽略</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>举报原因</TableHead>
              <TableHead>相关帖子</TableHead>
              <TableHead>举报人</TableHead>
              <TableHead>时间</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  加载中...
                </TableCell>
              </TableRow>
            ) : reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  暂无举报记录
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="max-w-xs truncate" title={report.reason}>
                    {report.reason}
                  </TableCell>
                  <TableCell>
                    {report.post ? (
                        <Link href={`/posts/${report.post.id}`} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1">
                            {report.post.title}
                            <Eye className="w-3 h-3" />
                        </Link>
                    ) : (
                        <span className="text-gray-400">帖子已删除</span>
                    )}
                  </TableCell>
                  <TableCell>{report.reporter.username}</TableCell>
                  <TableCell>{format(new Date(report.createdAt), "yyyy-MM-dd HH:mm")}</TableCell>
                  <TableCell>
                    <Badge variant={report.status === "PENDING" ? "secondary" : report.status === "RESOLVED" ? "default" : "outline"}>
                        {report.status === "PENDING" ? "待处理" : report.status === "RESOLVED" ? "已处理" : "已忽略"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {report.status === "PENDING" && (
                        <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleStatusUpdate(report.id, "RESOLVED")}>
                                <CheckCircle className="w-4 h-4 mr-1" /> 处理
                            </Button>
                            <Button size="sm" variant="outline" className="text-gray-500 hover:text-gray-700" onClick={() => handleStatusUpdate(report.id, "IGNORED")}>
                                <XCircle className="w-4 h-4 mr-1" /> 忽略
                            </Button>
                        </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            上一页
          </Button>
          <span className="flex items-center px-4 text-sm text-gray-600">
            第 {page} / {totalPages} 页
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            下一页
          </Button>
        </div>
      )}
    </div>
  );
}
