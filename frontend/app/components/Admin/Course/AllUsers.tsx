import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/Redux/features/user/userApi";
import { styles } from "@/app/style/style";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type props = {
  isTeam: boolean;
};
const AllUsers = ({ isTeam }: props) => {
  const { theme } = useTheme();
  const {
    isLoading,
    data,
    refetch,
    isSuccess: success,
    error: getUserError,
  } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
  const [userId, setUserId] = useState<string | undefined>();
  const [deleteUser, { isSuccess, error }] = useDeleteUserMutation();
  const [updateUserRole, { isSuccess: updateSuccess }] =
    useUpdateUserRoleMutation();
  const [open, setOpen] = useState(false);

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("User Deleted Successfully");
    }
    if (updateSuccess) {
      refetch();
      toast.success("User Role Updated Successfully");
      setActive(false);
    }
  }, [isSuccess, updateSuccess]);

  useEffect(() => {
    if (success) {
      refetch();
    }
  }, [success]);

  const columns = [
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.2 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },

    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(!open);
            setUserId(params.row.id);
          }}
        >
          <AiOutlineDelete className="dark:text-white text-black" size={20} />
        </Button>
      ),
    },
    {
      field: " ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => (
        <a
          href={`mailto:${params.row.email}`}
          style={{
            textDecoration: "none", // Removes underline
            color: "inherit", // Adopts parent text color
            listStyleType: "none", // Explicitly removes bullet
            display: "inline-block", // Prevents list-item behavior
          }}
        >
          <AiOutlineMail className="dark:text-white text-black" size={20} />
        </a>
      ),
    },
  ];
  const rows: any = [];

  if (isTeam) {
    const newData = data?.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any, index: number) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    {
      data &&
        data.users.forEach((item: any, index: number) => {
          rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            courses: item.courses.length,
            created_at: format(item.createdAt),
          });
        });
    }
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("User Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    await deleteUser(userId);
    setOpen(!open);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setActive(!active);
    const email = e.target[0].value;
    const name = e.target[1].value;
    const password = e.target[2].value;
    const role = e.target[3].value;

    console.log(email, role, password, name);
    await updateUserRole({ email, role, password, name });
  };
  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className=" flex justify-end  ">
            <div
              className={`${styles.button} !w-[220px] !cursor-pointer`}
              onClick={() => setActive(!active)}
            >
              Update User Role
            </div>
          </div>
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .MuiSvgIcon-root": {
                color: theme === "dark" ? "#E0AFFF" : "#5C5CFF",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#E0AFFF" : "#5C5CFF",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#E0E0E0" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.3) !important"
                    : "1px solid rgba(0, 0, 0, 0.1) !important",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3E4396" : "#6C63FF",
                color: theme === "dark" ? "red" : "red",
                borderBottom: "none",
                fontWeight: "bold",
                fontSize: "1rem",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#3E4396" : "#6C63FF",
                color: theme === "dark" ? "#FFFFFF" : "#FFFFFF",
                borderTop: "none",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark"
                    ? `#A0D995 !important`
                    : `#6C63FF !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color:
                  theme === "dark"
                    ? "#FFFFFF !important"
                    : "#6C63FF !important",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1A1B41" : "#F8F9FA",
              },
            }}
          >
            <DataGrid rows={rows} columns={columns} checkboxSelection />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50px] left-[50%] -translate-x-1/2 ">
                <h1 className={`${styles.title}`}>
                  Are you sure do you want to delte this user?
                </h1>
                <div className="flex w-full item-center justify-between mb-6">
                  <div
                    className={`${styles.button}!w-[120px]' h-[30px] bg-[#57c7a3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button}!w-[120px]' h-[30px] bg-[#d33] `}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-4"
                sx={{
                  backgroundColor: theme === "dark" ? "#1A1B41" : "#FFFFFF",
                  boxShadow: 24,
                  borderRadius: 2,
                  width: 400,
                }}
              >
                <h2 className={`${styles.title} mb-4`}>Add New Member</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className={`${styles.input} mb-4`}
                    placeholder="Email"
                    required
                  />
                  <input
                    type="text"
                    className={`${styles.input} mb-4`}
                    placeholder="name"
                    required
                  />
                  <input
                    type="password"
                    className={`${styles.input} mb-4`}
                    placeholder="password"
                    required
                  />
                  <select
                    className={`${styles.input} mb-4`}
                    name="role"
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <Button
                    type="submit"
                    className={`${styles.button} mt-4`}
                    sx={{
                      backgroundColor: theme === "dark" ? "#6C63FF" : "#3E4396",
                      color: "#FFFFFF",
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
