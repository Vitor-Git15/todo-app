import React from "react";

interface SettingItemProps {
  label: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ label, value, onChange }) => {
  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        style={styles.checkbox}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  label: {
    fontSize: "16px",
  },
  checkbox: {
    transform: "scale(1.5)",
  },
};

export default SettingItem;
