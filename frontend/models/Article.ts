export interface Article {
  id: number;
  status: string;
  title: string;
  content: string;
  coverImage: string;
  ownerId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
  owner: {
    username: string;
    userProfiles: [{ icon: string; name: string }];
  };
}
