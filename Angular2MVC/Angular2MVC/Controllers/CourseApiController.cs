using Angular2MVC.DBContext;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Angular2MVC.Controllers
{
    public class CourseApiController : BaseApiController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(UserDB.TblCourse.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]TblCourse value)
        {
            UserDB.TblCourse.Add(value);
            return ToJson(UserDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody] TblCourse value)
        {
            UserDB.Entry(value).State = EntityState.Modified;
            return ToJson(UserDB.SaveChanges());
        }

        public HttpResponseMessage Delete(int id)
        {
            UserDB.TblCourse.Remove(UserDB.TblCourse.FirstOrDefault(x => x.Id == id));
            return ToJson(UserDB.SaveChanges());
        }

    }
}
