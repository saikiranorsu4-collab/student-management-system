import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  Camera,
  Edit,
  Save,
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Calendar,
  MapPin,
  X,
} from "lucide-react";

import {
  getMyProfile,
  updateMyProfile,
} from "../../services/studentService";

import {
  useAuth,
} from "../../context/AuthContext";

function MyProfile() {
  const {
    user,
    updateUser,
  } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
      phone: "",
      rollNumber: "",
      department: "",
      course: "",
      year: "",
      section: "",
      address: "",
      profileImage: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      try {
        const response =
          await getMyProfile();

        setProfile(
          response.student
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImageUpload = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      toast.error(
        "Image size must be below 2MB"
      );
      return;
    }

    const reader =
      new FileReader();

    reader.onloadend =
      () => {
        setProfile({
          ...profile,
          profileImage:
            reader.result,
        });
      };

    reader.readAsDataURL(
      file
    );
  };

  const removeProfileImage =
    () => {
      setProfile({
        ...profile,
        profileImage: "",
      });

      toast.success(
        "Profile photo removed"
      );
    };

  const saveProfile =
  async () => {
    try {

      setSaving(true);

      const response =
        await updateMyProfile(
          profile
        );

      setProfile(
        response.student
      );

      const updatedUser = {
        ...user,
        name:
          response.student.name,
        profileImage:
          response.student.profileImage,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(
          updatedUser
        )
      );

      updateUser(
        updatedUser
      );

      toast.success(
        "Profile Updated Successfully"
      );

      setEditing(false);

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setSaving(false);

    }
  };
  
  if (loading) {
    return (
      <div
        className="
        flex
        justify-center
        items-center
        h-[400px]
      "
      >
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your profile information
        </p>
      </div>

      {/* PROFILE CARD */}

      <div
        className="
        bg-[#0F172A]
        border
        border-gray-800
        rounded-3xl
        p-5
      "
      >
        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-6
          items-center
        "
        >
          <div className="relative">

            <img
              src={
                profile.profileImage ||
                `https://ui-avatars.com/api/?name=${profile.name}&background=7c3aed&color=fff&size=256`
              }
              alt="profile"
              className="
              w-28
              h-28
              rounded-full
              object-cover
              border-4
              border-purple-600
            "
            />

            {editing && (
              <>
                <label
                  className="
                  absolute
                  bottom-0
                  right-0
                  bg-purple-600
                  hover:bg-purple-700
                  p-2.5
                  rounded-full
                  cursor-pointer
                "
                >
                  <Camera
                    size={16}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={
                      handleImageUpload
                    }
                  />
                </label>

                {profile.profileImage && (
                  <button
                    onClick={
                      removeProfileImage
                    }
                    className="
                    absolute
                    -top-1
                    -right-1
                    w-8
                    h-8
                    rounded-full
                    bg-red-600
                    hover:bg-red-700
                    flex
                    items-center
                    justify-center
                  "
                  >
                    <X
                      size={14}
                    />
                  </button>
                )}
              </>
            )}
          </div>

          <div className="flex-1">
            <h2
              className="
              text-2xl
              font-bold
            "
            >
              {profile.name}
            </h2>

            <p className="text-purple-400">
              {profile.rollNumber}
            </p>

            <p className="text-gray-400">
              {profile.department}
              {" • "}
              {profile.year}
            </p>

            <div className="mt-4">

              {!editing ? (
                <button
                  onClick={() =>
                    setEditing(
                      true
                    )
                  }
                  className="
                  flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  bg-purple-600
                  hover:bg-purple-700
                  rounded-xl
                "
                >
                  <Edit
                    size={18}
                  />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={
                    saveProfile
                  }
                  disabled={saving}
                  className="
                  flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  bg-green-600
                  hover:bg-green-700
                  rounded-xl
                  disabled:opacity-50
                "
                >
                  <Save
                    size={18}
                  />

                  {saving
                    ? "Saving..."
                    : "Save Profile"}
                </button>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div
        className="
        grid
        md:grid-cols-4
        gap-4
      "
      >
        <StatCard
          icon={
            <GraduationCap />
          }
          title="Course"
          value={profile.course}
        />

        <StatCard
          icon={<BookOpen />}
          title="Department"
          value={
            profile.department
          }
        />

        <StatCard
          icon={<Calendar />}
          title="Year"
          value={profile.year}
        />

        <StatCard
          icon={<User />}
          title="Section"
          value={profile.section}
        />
      </div>

      {/* DETAILS */}

      <div
        className="
        bg-[#0F172A]
        border
        border-gray-800
        rounded-3xl
        p-6
      "
      >
        <h2
          className="
          text-2xl
          font-bold
          mb-6
        "
        >
          Personal Information
        </h2>

        <div
          className="
          grid
          md:grid-cols-2
          gap-5
        "
        >

          <InputField
            icon={<User />}
            label="Name"
            name="name"
            value={profile.name}
            editing={editing}
            onChange={
              handleChange
            }
          />

          <InputField
            icon={<Mail />}
            label="Email"
            value={profile.email}
            editing={false}
          />

          <InputField
            icon={<Phone />}
            label="Phone"
            name="phone"
            value={profile.phone}
            editing={editing}
            onChange={
              handleChange
            }
          />

          <InputField
            icon={<MapPin />}
            label="Address"
            name="address"
            value={
              profile.address
            }
            editing={editing}
            onChange={
              handleChange
            }
          />

        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}) {
  return (
    <div
      className="
      bg-[#0F172A]
      border
      border-gray-800
      rounded-2xl
      p-5
    "
    >
      <div className="mb-3">
        {icon}
      </div>

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h3
        className="
        text-xl
        font-semibold
      "
      >
        {value || "-"}
      </h3>
    </div>
  );
}

function InputField({
  icon,
  label,
  value,
  editing,
  name,
  onChange,
}) {
  return (
    <div>

      <label
        className="
        flex
        items-center
        gap-2
        text-gray-400
        text-sm
        mb-2
      "
      >
        {icon}
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value || ""}
        disabled={!editing}
        onChange={onChange}
        className="
        w-full
        p-3
        rounded-xl
        bg-[#1E293B]
        border
        border-gray-700
      "
      />

    </div>
  );
}

export default MyProfile;