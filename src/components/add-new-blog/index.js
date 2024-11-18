"use client"

import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Fragment, useState } from "react"


import React from 'react'



export const AddNewBlog = ({ openBlogDialog, setOpenBlogDialog, loading, blogFormData, setBlogFormData, handleSaveBlogData, currentEditedBlogId, setCurrentEditedBlogId }) => {
    return (
        <Fragment>
            <div>
                <Button onClick={() => { setOpenBlogDialog(true) }}>Add New Blog</Button>

            </div>


            <Dialog open={openBlogDialog} onOpenChange={() => {
                setOpenBlogDialog(false);
                setCurrentEditedBlogId(null);
                setBlogFormData({
                    title : "",
                    description : ""
                })
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentEditedBlogId ? "Edit Blog" : "Add New Blog"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Title" className="text-center">
                                Title
                            </Label>
                            <Input
                                name="title"
                                placeholder="Enter Blog Title"
                                value={blogFormData.title}
                                onChange={(e) => setBlogFormData({
                                    ...blogFormData, title: e.target.value
                                })
                                }
                                id="Title"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="desc" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="desc"
                                name="description"
                                value={blogFormData.description}
                                placeholder=""
                                onChange={(e) => setBlogFormData({
                                    ...blogFormData, description: e.target.value
                                })
                                }
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleSaveBlogData}>
                            {
                                loading ? "Saving Changes" : "Save Changes"
                            }

                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
