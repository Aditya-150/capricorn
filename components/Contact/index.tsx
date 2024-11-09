"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
  budget: z
    .number()
    .gte(10, { message: "Budget must be at least $10." })
    .optional()
    .or(z.literal("")), // Allow empty string for optional field
});
type FormData = z.infer<typeof formSchema>;

export const Contact = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      budget: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Add your submission logic here
  };

  return isClient ? (
    <div id="contact" className="bg-background">
      <div className="flex sm:flex-row flex-col mx-auto max-w-7xl py-20 relative 2xl:px-0 px-6">
        <div className="sm:w-1/2 sm:pr-8">
          <h2 className="text-5xl font-serif text-dark mb-4">
            Anything in Your Mind..
            <br />
            Any Project?
          </h2>
          <p className="text-gray-600 mb-8">
            Fill out the form. We will get back to you.
          </p>
        </div>
        <div className="sm:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name."
                {...register("name")}
                className={`w-full px-4 py-3 border rounded-md ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address."
                {...register("email")}
                className={`w-full px-4 py-3 border rounded-md ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Write a short message describing your project."
                {...register("message")}
                className={`w-full px-4 py-3 border rounded-md resize-none ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                rows={5}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="budget" className="block mb-2 font-medium">
                Budget (optional)
              </label>
              <input
                type="number"
                id="budget"
                placeholder="Enter your budget. Minimum $10."
                {...register("budget", {
                  setValueAs: (value) =>
                    value === "" ? "" : parseFloat(value),
                })}
                className={`w-full px-4 py-3 border rounded-md ${
                  errors.budget ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.budget && (
                <p className="text-red-500 text-sm">{errors.budget.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="relative inline-flex items-center justify-start px-5 py-3 overflow-hidden rounded-full group"
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-dark opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-dark opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left text-dark transition-colors duration-200 ease-in-out group-hover:text-white">
                Send Message
              </span>
              <span className="absolute inset-0 border-2 border-dark rounded-full"></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};
