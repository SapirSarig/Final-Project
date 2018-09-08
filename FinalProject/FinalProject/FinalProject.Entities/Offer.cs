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
        public Offer()
        {

        }
        [Key]
        public int Id { get; set; }

        

        //public ICollection<SocialNetwork> SocialNetworks { get; set; }

        public string Description { get; set; }

        //public ICollection<AdvertisingForm> AdvertisingForms { get; set; }
        //public Auction auction { get; set; }


        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual InfluencerUser InfluencerUser { get; set; }

    }
}
