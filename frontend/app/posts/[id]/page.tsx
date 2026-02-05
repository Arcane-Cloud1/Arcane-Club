"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import PostInteractions from "@/components/PostInteractions";
import CommentSection from "@/components/CommentSection";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  author: {
    username: string;
    avatar?: string;
  };
  board: {
    name: string;
  };
  isLiked: boolean;
  isFavorited: boolean;
  commentCount: number;
}

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [reportReason, setReportReason] = useState("");
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    if (id) {
      api.get(`/posts/${id}`)
        .then((res) => {
          setPost(res.data.data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleReport = async () => {
    if (!reportReason.trim()) {
        toast.error("请输入举报原因");
        return;
    }
    try {
        await api.post(`/posts/${id}/report`, { reason: reportReason });
        toast.success("举报已提交，我们会尽快处理");
        setReportOpen(false);
        setReportReason("");
    } catch (error) {
        toast.error("举报提交失败");
    }
  };

  if (loading) return <div className="p-8 text-center">加载中...</div>;
  if (!post) return <div className="p-8 text-center">帖子未找到</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {post.board.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleString()}
                    </span>
                </div>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <div className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                    <span>作者: {post.author.username || "匿名"}</span>
                    <span>|</span>
                    <span>阅读: {post.viewCount}</span>
                </div>
            </div>
            
            <Dialog open={reportOpen} onOpenChange={setReportOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500 shrink-0 ml-4">
                        <AlertTriangle className="w-4 h-4 mr-1" /> 举报
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>举报帖子</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>举报原因</Label>
                            <Textarea 
                                placeholder="请详细描述违规情况..." 
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setReportOpen(false)}>取消</Button>
                        <Button variant="destructive" onClick={handleReport}>提交举报</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none whitespace-pre-wrap">
            {post.content}
          </div>
          
          <PostInteractions 
            postId={post.id} 
            initialLiked={post.isLiked} 
            initialFavorited={post.isFavorited}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
        </CardContent>
      </Card>

      <div id="comments">
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
