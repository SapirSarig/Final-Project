using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class AdvertiserUser : User
    {
        [Required, MaxLength(40)]
        public string CompanyName { get; set; }

        [Required]
        //[RegularExpression(@.......)]
        public string WebsiteLink { get; set; }
    }
}
