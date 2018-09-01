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

        public AdvertiserUser()
        {
            // SocialNetworks = new HashSet<SocialNetwork>();
            //Interests = new HashSet<Interest>();
            Auctions = new HashSet<Auction>();
        }


        public ICollection<Auction> Auctions { get; set; }

        //[Required, MaxLength(40)]
        public string CompanyName { get; set; }

        //[Required]
        ////[RegularExpression(@.......)]
        public string WebsiteLink { get; set; }

        //public ICollection<SocialNetwork> SocialNetworks { get; set; }
    }
}
