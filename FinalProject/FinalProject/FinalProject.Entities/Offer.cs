using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinalProject.Entities.Enums;

namespace FinalProject.Entities
{
    public class Offer
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual InfluencerUser InfluencerUser { get; set; }

        //we need to connect it to a specific auction
        //public Auction auction { get; set; }

        //public string StarName { get; set; }

        public ICollection<AdvertisingForm> AdvertisingForms { get; set; }

        //public ICollection<SocialNetwork> SocialNetworks { get; set; }

        public string Description { get; set; }

    }
}
