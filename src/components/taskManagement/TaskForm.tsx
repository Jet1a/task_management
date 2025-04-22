import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  SelectProps,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { categories } from "../../data/categories";
import { TaskType } from "../../pages/TaskManagementPage";

const statusOptions: CheckboxGroupProps<string>["options"] = [
  { label: "Todo", value: "Todo" },
  { label: "On Process", value: "On Process" },
  { label: "Done", value: "Done" },
];

const categoryOptions: SelectProps["options"] = categories;

interface TaskFormProps {
  editTask?: TaskType;
  onFinish: (values: TaskType, id?: number) => void;
  onCancel: () => void;
}

const TaskForm = ({ editTask, onFinish, onCancel }: TaskFormProps) => {
  const [form] = Form.useForm();

  const minDate = new Date().toISOString();

  useEffect(() => {
    if (editTask) {
      form.setFieldsValue({
        title: editTask.title,
        description: editTask.description,
        dateRange: dayjs(editTask.dateRange),
        category: editTask.category,
        status: editTask.status,
      });
    }
  }, [editTask, form]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="task_form"
        clearOnDestroy
        onFinish={onFinish}
      >
        <Form.Item
          id="title"
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your Title!" }]}
        >
          <Input placeholder="Task title" />
        </Form.Item>
        <Form.Item id="description" label="Description" name="description">
          <Input.TextArea placeholder="What to do with this task..." />
        </Form.Item>
        <Form.Item
          id="dateRange"
          label="Due Date"
          name="dateRange"
          rules={[{ required: true, message: "Please select due date!" }]}
        >
          <DatePicker
            disabledDate={(current) =>
              current && current.toDate() < new Date(minDate)
            }
          />
        </Form.Item>
        <Form.Item id="category" label="Category/Tags" name="category">
          <Select
            style={{ width: "100%" }}
            placeholder="Category"
            options={categoryOptions}
          />
        </Form.Item>
        <Form.Item
          id="status"
          label="Status"
          name="status"
          rules={[
            { required: true, message: "Please select status!" },
          ]}
        >
          <Radio.Group
            block
            options={statusOptions}
            optionType="button"
            buttonStyle="outline"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full my-2">
            {editTask ? "Update" : "Submit"}
          </Button>
          <Button
            type="default"
            htmlType="button"
            className="w-full"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TaskForm;
