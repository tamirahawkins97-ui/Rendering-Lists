import { useState } from 'react';

interface TaskData {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  message?: string;
}

const SingleStateForm: React.FC = () => {
  // Renamed state to lowercase taskData to avoid interface name collision
  const [taskData, setTaskData] = useState<TaskData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [name]: value,
    }));

    // Optional: Clear individual field error as the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. Create a local temporary object to collect validation errors
    const newErrors: FormErrors = {};

    // 2. Perform field validations
    if (taskData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (!taskData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (taskData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    // 3. Save all collected errors into state at once
    setErrors(newErrors);

    // 4. Stop form execution if any errors exist
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // 5. Submit successful data
    console.log("Form submitted successfully:", taskData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={taskData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={taskData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={taskData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={taskData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <div>
          <label>Message:</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={taskData.message}
            onChange={handleChange}
          />
          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SingleStateForm;