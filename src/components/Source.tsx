import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Source: React.FC = () => {
  const currentUser = getCurrentUser();
  return (
    <div className="container">
      Source
    </div>
  );
};

export default Source;
