using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace AngularTest.AngularJS_快速入门.ashx
{
    /// <summary>
    /// QuestionHandler 的摘要说明
    /// </summary>
    public class QuestionHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            List<object> data = new List<object>();
            List<object> temp = new List<object>();
            data.Add(new
            {
                newTitle = "新建试题",
                previewTitle = "预览试题",
                name = "",
                fraction = "",
                type = 1,
                options = temp
            });
                /*
                 var questionModel = {
    newTitle: "新建试题",
    previewTitle: "预览试题",
    name: "",
    fraction: "",
    type: "1",
    options: []
};
                 */
            JavaScriptSerializer jss = new JavaScriptSerializer();
            string jsonStr = jss.Serialize(data);
            context.Response.Write(jsonStr);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}