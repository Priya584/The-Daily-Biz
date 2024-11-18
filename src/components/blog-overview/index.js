


"use client"

import { useEffect, useState } from "react"
import { AddNewBlog } from "../add-new-blog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"


const initialBlogFormData = {
  title: "",
  description: ""
}

export default function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData)
  const [currentEditedBlogId, setCurrentEditedBlogId] = useState(null)

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router])

  async function handleSaveBlogData() {
    try {
      setLoading(true)
      const apiResponse = currentEditedBlogId !== null ? 
      await fetch(`/api/update-blog?id=${currentEditedBlogId}`,
        {
          method : "PUT",
          body : JSON.stringify(blogFormData)
        }
      )
      : await fetch('/api/add-blog',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogFormData)
        }
      );

      const result = await apiResponse.json();
      if (result?.success) {
        setBlogFormData(initialBlogFormData);
        setOpenBlogDialog(false);
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
      setBlogFormData(initialBlogFormData);
      setCurrentEditedBlogId(null)
    }
  }

  async function handleDeleteByBlogId(getCurrentId) {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentId}`, {
        method: "DELETE"
      })
      const result = await apiResponse.json()

      if (result?.success) {
        router.refresh()
        console.log(result);
      }

    } catch (error) {
      console.log(error);
    }
  }

 function handleUpdateByBlogId(BlogItem) {
    setCurrentEditedBlogId(BlogItem._id)
    setBlogFormData({
      title : BlogItem.title,
      description : BlogItem.description,
    })
    setOpenBlogDialog(true)
   
  }

  console.log(currentEditedBlogId);
  return (
    <div className="min-h-screen p-6 flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600">
      <AddNewBlog openBlogDialog={openBlogDialog} setOpenBlogDialog={setOpenBlogDialog} loading={loading} setLoading={setLoading} blogFormData={blogFormData} setBlogFormData={setBlogFormData} handleSaveBlogData={handleSaveBlogData} currentEditedBlogId={currentEditedBlogId} setCurrentEditedBlogId={setCurrentEditedBlogId} />

      <div className="grid mr-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-9">
        {blogList && blogList.length > 0 ?
          blogList.map((item, index) => {
            return (
              <Card key={index} className="pt-5 px-3">
                <CardContent>
                  <CardHeader>
                    <CardTitle className="mb-5">{item?.title}</CardTitle>
                    <CardDescription>{item?.description}</CardDescription>
                  </CardHeader>

                  <div className="flex px-7 mt-6 gap-9 items-center">
                    <Button onClick={() => handleUpdateByBlogId(item)}>Edit</Button>
                    <Button onClick={() => handleDeleteByBlogId(item._id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
          : <Label className="text-6xl font-extrabold">No Blog Found ! Please Add One</Label>
        }
      </div>
    </div>
  )
}