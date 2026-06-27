import type { Metadata } from "next";
import { requireAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { BlogClient } from "@/components/admin/BlogClient";

export const metadata: Metadata = { title: "Blog • theforge Admin" };

export default async function AdminBlogPage() {
  await requireAdminSession();
  const { data: posts } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <BlogClient posts={posts ?? []} />
    </div>
  );
}
