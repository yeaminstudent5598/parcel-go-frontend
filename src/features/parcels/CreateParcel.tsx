// // src/features/parcels/CreateParcel.tsx
// import React from "react";
// import { useForm, type SubmitHandler } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { addParcel } from "./parcelSlice";
// import type { IParcel } from "@/types/parcel";

// export interface ICreateParcel {
//   trackingNumber: string;
//   senderName: string;
//   receiverName: string;
//   origin: string;
//   destination: string;
//   status: string;
// }

// // mapper function: convert ICreateParcel -> IParcel
// function mapCreateParcelToParcel(data: ICreateParcel): IParcel {
//   return {
//     id: crypto.randomUUID(),
//     name: `${data.senderName} → ${data.receiverName}`,
//     senderId: data.senderName,       // placeholder (later use real senderId)
//     receiverId: data.receiverName,   // placeholder (later use real receiverId)
//     trackingNumber: data.trackingNumber,
//     status: data.status as IParcel["status"],
//     weight: 1, // placeholder, later form field add korbo
//     price: 100, // placeholder, later form field add korbo
//     origin: data.origin,
//     destination: data.destination,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };
// }

// const CreateParcel: React.FC = () => {
//   const dispatch = useDispatch();

//   const form = useForm<ICreateParcel>({
//     defaultValues: {
//       trackingNumber: "",
//       senderName: "",
//       receiverName: "",
//       origin: "",
//       destination: "",
//       status: "Pending",
//     },
//   });

//   const onSubmit: SubmitHandler<ICreateParcel> = async (data) => {
//     try {
//       await fakeCreateParcelApi(data);

//       const newParcel = mapCreateParcelToParcel(data);
//       dispatch(addParcel(newParcel));

//       toast.success("Parcel created successfully!");
//       form.reset();
//     } catch (err: any) {
//       toast.error(err.message || "Parcel creation failed");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Create Parcel</h2>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           {/* Tracking Number */}
//           <FormField
//             control={form.control}
//             name="trackingNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Tracking Number</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Enter tracking number" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Sender Name */}
//           <FormField
//             control={form.control}
//             name="senderName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Sender Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Sender full name" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Receiver Name */}
//           <FormField
//             control={form.control}
//             name="receiverName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Receiver Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Receiver full name" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Origin */}
//           <FormField
//             control={form.control}
//             name="origin"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Origin</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Origin location" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Destination */}
//           <FormField
//             control={form.control}
//             name="destination"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Destination</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Destination location" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Status */}
//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Status</FormLabel>
//                 <FormControl>
//                   <select {...field} className="w-full border rounded-md p-2">
//                     <option value="Pending">Pending</option>
//                     <option value="In Transit">In Transit</option>
//                     <option value="Delivered">Delivered</option>
//                   </select>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full mt-4">
//             Create Parcel
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default CreateParcel;

// // Fake API simulation (replace with real backend API)
// async function fakeCreateParcelApi(parcel: ICreateParcel) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(parcel);
//     }, 1000);
//   });
// }
