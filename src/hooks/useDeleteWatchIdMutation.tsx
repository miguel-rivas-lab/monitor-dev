import { useMutation, useQueryClient } from "react-query";
import { deleteFromWatchIds } from "../api";

export const useDeleteWatchIdsMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, any, string>(
    "watching_assets",
    (id) => deleteFromWatchIds(id),
    {
      onSuccess: (_, id) => {
        queryClient.setQueryData<Record<string, boolean>>(
          "watching_assets",
          (prevData) => {
            if (prevData) {
              const { [id]: toDelete, ...rest } = prevData;
              return rest;
            }
            return {};
          }
        );
        queryClient.invalidateQueries("watching_assets");
        mutation.reset();
      },
    }
  );

  return mutation;
};
