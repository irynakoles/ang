using Angular2MVC.DBContext;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace Angular2MVC.Controllers
{
    public class BaseApiController : ApiController
    {
        protected readonly UserDBEntities1 UserDB = new UserDBEntities1();
        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var responce = Request.CreateResponse(HttpStatusCode.OK);
            responce.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return responce;
        }
    }
}
