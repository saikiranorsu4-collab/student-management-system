import { useAuth } from "../../context/AuthContext";

function ProfileSettings() {

  const { user } =
    useAuth();

  return (

    <div className="space-y-6">

      <div
        className="
        rounded-3xl
        overflow-hidden
        bg-gradient-to-r
        from-purple-600
        via-pink-500
        to-purple-700
      "
      >

        <div className="p-6">

          <div
            className="
            flex
            items-center
            gap-6
          "
          >

            {user?.profileImage ? (

              <img
                src={
                  user.profileImage
                }
                alt="profile"
                className="
                w-24
                h-24
                rounded-full
                object-cover
                border-4
                border-white/30
              "
              />

            ) : (

              <div
                className="
                w-24
                h-24
                rounded-full
                bg-white/20
                flex
                items-center
                justify-center
                text-3xl
                font-bold
              "
              >

                {user?.name?.charAt(
                  0
                )}

              </div>

            )}

            <div>

              <h2
                className="
                text-3xl
                font-bold
                text-white
              "
              >
                {user?.name}
              </h2>

              <p className="text-white/90 mt-1">
                {user?.email}
              </p>

              <div
                className="
                mt-3
                inline-flex
                px-4
                py-1
                rounded-full
                bg-white/20
                capitalize
              "
              >
                {user?.role}
              </div>

            </div>

          </div>

        </div>

      </div>

      <div
        className="
        bg-[#0F172A]
        rounded-3xl
        border
        border-gray-800
      "
      >

        <div className="p-6 border-b border-gray-800">

          <h2 className="text-2xl font-bold">
            Personal Information
          </h2>

        </div>

        <div
          className="
          p-6
          grid
          md:grid-cols-2
          gap-5
        "
        >

          <Field
            label="Full Name"
            value={
              user?.name
            }
          />

          <Field
            label="Email"
            value={
              user?.email
            }
          />

          <Field
            label="Role"
            value={
              user?.role
            }
          />

        </div>

      </div>

    </div>

  );

}

function Field({
  label,
  value,
}) {

  return (

    <div>

      <label
        className="
        text-gray-400
        text-sm
      "
      >
        {label}
      </label>

      <input
        type="text"
        value={
          value || ""
        }
        readOnly
        className="
        w-full
        mt-2
        p-3
        rounded-xl
        bg-[#111827]
        border
        border-gray-700
      "
      />

    </div>

  );

}

export default ProfileSettings;