import axios from "axios";

export interface StatisticData{
    label: string;
    doanh_thu: number;
}
export const getStatisticByType = async (type: string) : Promise<StatisticData[]> =>{
    const response = await axios.get(`http://localhost:3001/statistic?type=${type}`);
    return response.data;
};
export const getStatisticByRange = async (from: string, to: string): Promise<StatisticData[]> => {
  const response = await axios.get(`http://localhost:3001/statistic/custom`, {
    params: { from, to },
  });
  return response.data;
};