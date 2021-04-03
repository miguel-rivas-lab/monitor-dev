import { useMutation, useQueryClient } from "react-query";
import { addToWatchIds } from "../api";

export const useAddToWatchIdMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, any, string>((id) => addToWatchIds(id), {
    onSuccess: (_, id) => {
      queryClient.setQueryData<Record<string, boolean>>(
        "watching_assets",
        (prevData) => ({ ...prevData, [id]: true })
      );
      queryClient.invalidateQueries("watching_assets");
      mutation.reset();
    },
  });

  return mutation;
};
