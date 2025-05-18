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
    setRole(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User: ", currentUser);
        const userInfo = { email: currentUser.email };

        try {
          const res = await axios.post(
            "https://mtsbackend20-production.up.railway.app/api/teamMember/login",
            userInfo,
          );

          if (res.data.token) {
            Cookies.set("core", res.data.token, { expires: 1 });
            setRole(res.data?.teamMember?.role);
            setDbUser(res.data?.teamMember);

            setRoleBasePermissionOne(
              roleBaseOne.includes(res.data?.teamMember?.role),
            );

            setRoleBasePermissionThree(
              roleBaseThree.includes(res.data?.teamMember?.role),
            );
            setRoleBasePermissionTwo(
              roleBaseTwo.includes(res.data?.teamMember?.role),
            );
            setOperationMemberPermission(
              roleBaseOperationMember.includes(res.data?.teamMember?.role),
            );
            setSalesMemberPermission(
              roleBaseSalesMember.includes(res.data?.teamMember?.role),
            );
            setBusinessDevelopmentPermission(
              roleBaseBusinessDevelopment.includes(res.data?.teamMember?.role),
            );
            setHodPermission(roleBaseHOD.includes(res.data?.teamMember?.role));
          } else {
            setRole(null);
            Cookies.remove("core");
          }
        } catch (error) {
          setRole(null);
          Cookies.remove("core");
          console.error("Login fetch failed:", error);
        }
      } else {
        setUser(null);
        setRole(null);
        Cookies.remove("core");
      }

      setIsLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    setIsLoading,
    isLoading,
    createUser,
    signInUser,
    logOutUser,
    dbUser,
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
