import React from "react";
import DailyStatistics from "./dailyStatistics/DailyStatistics";
import CommonPageInfo from "../../common/CommonPageInfo";
import CommonRoot from "../../common/CommonRoot";

const CardAnalysis = () => {
  return (
    <CommonRoot>
      <CommonPageInfo
        title={"일별통계(캘린더)"}
        text={
          <p>
            내가 선택한 날짜의 소비내역을 알려드립니다. <br />
            캘린더의 날짜 클릭하시면 소비 내역을 확인하실수 있습니다.
          </p>
        }
      />
      <DailyStatistics />
    </CommonRoot>
  );
};
export default CardAnalysis;
