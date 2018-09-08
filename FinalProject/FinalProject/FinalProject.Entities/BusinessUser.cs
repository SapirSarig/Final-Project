using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinalProject.Entities.Enums;

namespace FinalProject.Entities
{
    public class BusinessUser : User
    {
        public BusinessUser()
        {
            Auctions = new HashSet<Auction>();
        }

        public string CompanyName { get; set; }

        public string WebsiteLink { get; set; }

        public virtual ICollection<Auction> Auctions { get; set; }
    }
}
