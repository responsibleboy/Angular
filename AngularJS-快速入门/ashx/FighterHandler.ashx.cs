using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace AngularTest.AngularJS_快速入门.ashx
{
    /// <summary>
    /// FighterHandler 的摘要说明
    /// </summary>
    public class FighterHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            List<object> datalist = new List<object>();
            datalist.Add(new { name = "Ryu", country = "Japan" });
            datalist.Add(new { name = "Ken", country = "USA" });
            datalist.Add(new { name = "Chun Li", country = "China" });
            datalist.Add(new { name = "GuiLe", country = "USA" });
            datalist.Add(new { name = "Zangief", country = "Russia" });
            
            /*
            $scope.fighters = [
        {name:'Ryu',country:'Japan'},
        {name:'Ken',country:'USA'},
        {name:'Chun Li',country:'China'},
        {name:'GuiLe',country:'USA'},
        {name:'Zangief',country:'Russia'}
        ];
             * */
            JavaScriptSerializer jss = new JavaScriptSerializer();
            string jsonStr = jss.Serialize(datalist);

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