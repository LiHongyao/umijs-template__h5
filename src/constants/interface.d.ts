// 提示：全局ts类型定义，使用时需将XXX修改为项目名称，如DDOUH5，将‘XXX’ 修改为 ‘DDOUH5’
// 访问：DDOUH5.BaseResponse 

export = XXX;
export as namespace XXX;

declare namespace XXX {
  interface BaseResponse<T = any> {
    code: number;
    data: T;
    msg: string;
    page: {
      pageNo: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    success: boolean;
  }
}
