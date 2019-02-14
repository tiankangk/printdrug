/**
 * 获取当前时间的函数
 */

export const sendTime = () => {
  const data = new Date();
  return `${data.getFullYear()}-${data.getMonth() +
            1}-${data.getDate()}`;
}

export const handleTiem = (key) => {
  return JSON.stringify(key)
    .split("T")[0]
    .split('"')[1];
}
