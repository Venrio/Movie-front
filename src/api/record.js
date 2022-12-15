import request from '@/utils/request'
// 获取浏览记录的电影id
export const getRecordMovieidApi = (data) => {
  return request({
    url: 'http://localhost:9000/browse-records/get-records',
    method: 'post',
    headers:{"content-type":"application/json"},
    data:data
  })
}

// 获取浏览记录电影的信息
export const getRecordMovieInfoApi = (data) => {
    return request({
        url: 'http://localhost:9000/movies/listByMovieId',
        method: 'post',
        headers:{"content-type":"application/json"},
        data:data
      })
}
