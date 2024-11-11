import React from "react";
import Piechart from "../../../pages/cardAnalysis/monthlyStatistics/chart/Piechart";
import Barchart from "../../../pages/cardAnalysis/monthlyStatistics/chart/Barchart";

const data = [
    { bottle: '9월', 외식: 1200, 의류: 1000, 온라인쇼핑: 1100 },
    { bottle: '10월', 외식: 2200, 의류: 2000, 온라인쇼핑: 2100 },
    { bottle: '11월', 외식: 3200, 의류: 3000, 온라인쇼핑: 3100 },
];

const MonthlyStatistics = () => {

    return (
        <div>
        <Piechart />
        <Barchart data={data}/>
    </div>
    );
    
};

export default MonthlyStatistics;