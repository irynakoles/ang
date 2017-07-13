﻿using Angular2MVC.DBContext;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Angular2MVC.Controllers
{
    public class UserApiController : BaseApiController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(UserDB.tblUser.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody] TblUser value)
        {
            UserDB.tblUser.Add(value);
            return ToJson(UserDB.SaveChanges());
        }

        public HttpResponseMessage Put( int id, [FromBody] TblUser value)
        {
            UserDB.Entry(value).State = EntityState.Modified;
            return ToJson(UserDB.SaveChanges());
        }

        public HttpResponseMessage Delete (int id)
        {
            UserDB.tblUser.Remove(UserDB.tblUser.FirstOrDefault(x => x.Id == id));
            return ToJson(UserDB.SaveChanges());
        }

    }
}