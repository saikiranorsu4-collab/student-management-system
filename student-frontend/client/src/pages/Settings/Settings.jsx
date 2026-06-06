import ProfileSettings from "../../components/settings/ProfileSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";

function Settings() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="text-gray-400 mt-2 text-lg">
          Manage your profile, security and preferences
        </p>
      </div>

      <ProfileSettings />

      <SecuritySettings />

    </div>
  );
}

export default Settings;