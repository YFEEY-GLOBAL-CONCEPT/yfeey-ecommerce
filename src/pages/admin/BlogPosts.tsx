import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  status: "Published" | "Draft";
}

const initialPosts: BlogPost[] = [
  { id: 1, title: "Top 10 Tech Gadgets for 2025", excerpt: "Discover the hottest tech gadgets this year...", author: "Admin", date: "2025-03-07", status: "Published" },
  { id: 2, title: "How to Style Your Home Office", excerpt: "Transform your workspace with these tips...", author: "Admin", date: "2025-03-05", status: "Published" },
  { id: 3, title: "Spring Fashion Trends", excerpt: "What's trending in fashion this spring...", author: "Admin", date: "2025-03-03", status: "Draft" },
  { id: 4, title: "Skincare Routine for Beginners", excerpt: "Everything you need for glowing skin...", author: "Admin", date: "2025-02-28", status: "Published" },
];

export default function BlogPosts() {
  const [posts, setPosts] = useState(initialPosts);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleDelete = (id: number) => setPosts((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground text-sm">{posts.length} posts</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />New Post</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Create Blog Post</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Title</Label><Input placeholder="Post title" /></div>
              <div><Label>Excerpt</Label><Input placeholder="Short description" /></div>
              <div><Label>Content</Label><Textarea placeholder="Write your post..." className="min-h-[200px]" /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddOpen(false)}>Publish</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{post.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${post.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {post.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 truncate">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-1">{post.author} · {post.date}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 ml-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
