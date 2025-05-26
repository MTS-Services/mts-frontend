import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
export const AuthContext = createContext(null);
const auth = getAuth(app);

// ✅ Define role groups
const roleBaseOne = [
  "operation_member",
  "operation_leader",
  "hod_sales",
  "hod_mern",
  "hod_wordpress",
  "hod_laravel",
  "hod_flutter",
  "hod_seo",
  "hod_graphic",
  "hod_shopify",
  "hod_plugin",
  "ceo",
];

const roleBaseTwo = [
  "sales_member",
  "sales_leader",
  "hod_sales",
  "hod_mern",
  "hod_wordpress",
  "hod_laravel",
  "hod_flutter",
  "hod_seo",
  "hod_graphic",
  "hod_shopify",
  "hod_plugin",
  "ceo",
];

const roleBaseThree = ["operation_leader"];
const roleBaseOperationMember = ["operation_member", "operation_leader"];
const roleBaseSalesMember = ["sales_member", "sales_leader"];
const roleBaseBusinessDevelopment = ["business_development"];
const roleBaseHOD = [
  "hod_sales",
  "hod_mern",
  "hod_wordpress",
  "hod_laravel",
  "hod_flutter",
  "hod_seo",
  "hod_graphic",
  "hod_shopify",
  "hod_plugin",
];

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [dbUser, setDbUser] = useState(null);

  const [roleBasePermissionOne, setRoleBasePermissionOne] = useState(null);
  const [roleBasePermissionTwo, setRoleBasePermissionTwo] = useState(null);
  const [roleBasePermissionThree, setRoleBasePermissionThree] = useState(null);
  const [operationMemberPermission, setOperationMemberPermission] =
    useState(null);
  const [salesMemberPermission, setSalesMemberPermission] = useState(null);
  const [businessDevelopmentPermission, setBusinessDevelopmentPermission] =
    useState(null);
  const [hodPermission, setHodPermission] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // 🔐 Auth methods
  const createUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setIsLoading(true);
    Cookies.remove("core");
    queryClient.clear();
    setRole(null);
    return signOut(auth);
  };

  // 🔄 onAuthStateChanged listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userInfo = { email: currentUser.email };

        try {
          const res = await axios.post(
            "https://mtsbackend20-production.up.railway.app/api/teamMember/login",
            userInfo,
          );

          const token = res.data?.token;
          const teamMember = res.data?.teamMember;

          if (token && teamMember) {
            Cookies.set("core", token, { expires: 1 });
            setRole(teamMember.role);
            setDbUser(teamMember);

            setRoleBasePermissionOne(roleBaseOne.includes(teamMember.role));
            setRoleBasePermissionTwo(roleBaseTwo.includes(teamMember.role));
            setRoleBasePermissionThree(roleBaseThree.includes(teamMember.role));
            setOperationMemberPermission(
              roleBaseOperationMember.includes(teamMember.role),
            );
            setSalesMemberPermission(
              roleBaseSalesMember.includes(teamMember.role),
            );
            setBusinessDevelopmentPermission(
              roleBaseBusinessDevelopment.includes(teamMember.role),
            );
            setHodPermission(roleBaseHOD.includes(teamMember.role));
          } else {
            console.warn("⚠️ Login succeeded, but token or role missing.");
          }
        } catch (error) {
          const status = error?.response?.status;
          console.error("❌ Login fetch failed:", error);

          if (status === 401 || status === 403) {
            Cookies.remove("core");
            setRole(null);
          }
        }
      } else {
        // ❌ User not logged in
        setUser(null);
        setRole(null);
        Cookies.remove("core");
      }

      setIsLoading(false);
    });

    return () => unSubscribe();
  }, []);

  // ✅ Context value
  const authInfo = {
    user,
    role,
    dbUser,
    isLoading,
    setIsLoading,
    createUser,
    signInUser,
    logOutUser,
    roleBasePermissionOne,
    roleBasePermissionTwo,
    roleBasePermissionThree,
    operationMemberPermission,
    salesMemberPermission,
    hodPermission,
    businessDevelopmentPermission,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
