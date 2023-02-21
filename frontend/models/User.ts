export interface User {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  isActive: boolean;
  userProfiles: [
    {
      icon?: string;
      coverImage?: string;
      description?: string;
    }
  ];
}
