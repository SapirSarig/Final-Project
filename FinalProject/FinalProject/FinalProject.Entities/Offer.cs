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
            PublishSocialNetworks = new HashSet<PublishSocialNetwork>();
            AdvertisingForms = new HashSet<AdvertisingForm>();
        }
        [Key]
        public int Id { get; set; }

        public virtual ICollection<AdvertisingForm> AdvertisingForms { get; set; }

        public virtual ICollection<PublishSocialNetwork> PublishSocialNetworks { get; set; }

        public string Description { get; set; }

        public double Payment { get; set; }

        public string Status { get; set; }

        public int? AuctionId { get; set; }
        [ForeignKey("AuctionId")]
        public virtual Auction Auction { get; set; }

        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual InfluencerUser InfluencerUser { get; set; }

    }
}
