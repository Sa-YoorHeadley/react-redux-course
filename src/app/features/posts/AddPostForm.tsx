import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useState } from "react";
import { AppDispatch } from "@/app/store";

export default function AddPostForm() {
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector(selectAllUsers);

  const defaultValues = {
    title: "",
    body: "",
    userId: "",
  };

  const formSchema = z.object({
    userId: z.string().min(1, { message: "User is required" }),
    title: z.string().min(2).max(50),
    body: z.string().min(2).max(1024),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (addRequestStatus !== "idle") return;
    try {
      setAddRequestStatus("pending");
      dispatch(addNewPost(values)).unwrap();
      form.reset(defaultValues);
    } catch (error) {
      console.error("Failed to save the post", error);
    } finally {
      setAddRequestStatus("idle");
    }
  }

  const userOptions = users.map((user) => (
    <SelectItem key={user.id} value={user.id}>
      {user.name}
    </SelectItem>
  ));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/2 p-8 my-8 rounded-lg border-2 space-y-4"
      >
        <h2>Add Post</h2>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* <SelectItem value=""></SelectItem> */}
                  {userOptions}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Post</Button>
      </form>
    </Form>
  );
}
