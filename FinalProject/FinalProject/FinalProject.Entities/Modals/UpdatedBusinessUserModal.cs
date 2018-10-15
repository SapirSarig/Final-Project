using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities.Modals
{
    public class UpdatedBusinessUserModal : UpdatedUserModal
    {
        public string CompanyName { get; set; }

        public string WebsiteLink { get; set; }
    }
}
