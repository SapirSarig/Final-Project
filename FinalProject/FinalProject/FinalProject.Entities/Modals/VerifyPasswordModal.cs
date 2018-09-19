using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities.Modals
{
    public class VerifyPasswordModal
    {
        public string Email { get; set; }
        public string Question1 { get; set; }
        public string Question2 { get; set; }
    }
}
