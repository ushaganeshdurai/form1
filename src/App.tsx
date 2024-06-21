import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string;
  mail: string;
  age: number;
  guestName: string;
  qn: string;
}

export default function App() {
  const [iscomingwithguest, setguest] = useState(false);

  const handleradio = (e: { target: { value: string } }) => {
    setguest(e.target.value === "yes");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ mode: "onChange" });

  const [formData, setFormData] = useState<IFormInput | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setFormData(data); // Store form data in state to display in summary
  };

  const resetForm = () => {
    reset(); // Reset form fields
    setFormData(null); // Clear stored form data
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            {...register("name", { required: true, maxLength: 30 })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
            id="name"
            type="text"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">Name is required</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("mail", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.mail ? "border-red-500" : ""
            }`}
            id="email"
            type="text"
            placeholder="Enter your Email id"
          />
          {errors.mail && (
            <p className="text-red-500 text-xs italic">{errors.mail.message}</p>
          )}
          {errors.mail && (
            <p className="text-red-500 text-xs italic">Email id is required</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Age
          </label>
          <input
            {...register("age", { required: true, min: 1, max: 99 })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.age ? "border-red-500" : ""
            }`}
            id="age"
            type="number"
            placeholder="Age"
          />
          {errors.age && (
            <p className="text-red-500 text-xs italic">Please enter a valid age</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="qn"
          >
            Are you coming with a guest?
          </label>
          <br />
          Yes{" "}
          <input
            type="radio"
            checked={iscomingwithguest}
            name="guestOption"
            onChange={handleradio}
            value={"yes"}
          />
          No{" "}
          <input
            type="radio"
            checked={!iscomingwithguest}
            name="guestOption"
            onChange={handleradio}
            value={"no"}
          />
        </div>
        {iscomingwithguest && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="guestName"
            >
              Guest Name
            </label>
            <input
              {...register("guestName", { required: true, maxLength: 30 })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.guestName ? "border-red-500" : ""
              }`}
              id="guestName"
              type="text"
              placeholder="Guest Name"
            />
            {errors.guestName && (
              <p className="text-red-500 text-xs italic">Guest Name is required</p>
            )}
          </div>
        )}

        {formData && (
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Summary:</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.mail}</p>
            <p><strong>Age:</strong> {formData.age}</p>
            {formData.guestName && <p><strong>Guest Name:</strong> {formData.guestName}</p>}
          </div>
        )}

        <button
          type="submit"
          className="bg-black p-3 rounded text-white font-bold mr-2"
        >
          SUBMIT
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-300 p-3 rounded text-black font-bold"
        >
          RESET
        </button>
      </form>
    </div>
  );
}
