using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class ErrorMessage
    {
        public string Message { get; set; }
        public HttpStatusCode Code { get; set; }
    }
}
