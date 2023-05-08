import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useQueries, useQuery } from "@tanstack/react-query";
import userApi from "../../../apis/user.api";
import { generateDateOfBirth, getMonthsFrom } from "../../../utils/utils";
import { Box, Typography } from "@mui/material";
import GenerateAvatar from "../../../components/GenerateAvatar";

function Birthday() {
  const date = new Date();
  const month = date.getMonth();
  const months = getMonthsFrom(month + 1);
  const year = date.getFullYear();
  const user = useSelector((state: RootState) => state.user.user);
  const queries = useQueries({
    queries: months.map((month) => ({
      queryKey: ["friends", month],
      queryFn: () => userApi.getFriendBirthdayByMonth(month),
    })),
  });
  console.log(queries);

  return (
    <Box
      sx={{
        backgroundColor: "#85FFBD",
        backgroundImage: `linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)`,
        borderRadius: "15px",
        padding: "5px",
      }}
    >
      {queries.map((query, index) => {
        const { isLoading, data } = query;
        if (isLoading) {
          return <div>Loading...</div>;
        }
        const friendBirthdayData = data?.data.data!;

        return (
          <Box
            sx={{
              maxWidth: "500px",
              border: "1px solid #eee",
              margin: "0 auto",
              padding: "5px 10px",
              borderRadius: "10px",
              backgroundColor: "#eee",
              mb: "5px",
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
              
            }}
          >
            <Typography
              variant="h2"
              fontSize="22px"
              mb="10px"
              fontWeight="bold"
              fontStyle="italic"
            >
              Tháng {months[index]}
            </Typography>
            {friendBirthdayData.length === 0 ? (
              <Box>Không có bạn bè nào sinh nhật tháng này!</Box>
            ) : (
              friendBirthdayData.map((friend: any) => (
                <Box display="flex" justifyContent="space-between" mb="5px" alignItems="center">
                  <Box display="flex" gap="10px">
                    <GenerateAvatar name={friend.name} avatar={friend.avatar} />
                    <Box>
                      <Typography fontWeight="bold">{friend.name}</Typography>
                      <Typography fontSize="14px" >
                        {generateDateOfBirth(friend.date_of_birth)}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{textDecoration: 'underline'}}>
                    {year - new Date(friend.date_of_birth).getFullYear()} tuổi
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default Birthday;
