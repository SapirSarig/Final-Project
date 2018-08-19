using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class Offer
    {
        Offer()
        {
            SocialNetworks = new HashSet<SocialNetwork>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [ForeignKey("Auction")]
        public int AuctionRefId { get; set; }
        public Auction Auction { get; set; }

        //[Required]
        //[ForeignKey("InfluencerUser")]
        //public int InfluencerUserRefId { get; set; }
        public InfluencerUserOffers InfluencerUser { get; set; }

        public string UserRequirements { get; set; }

        public int Price { get; set; }

        [Required]
        public OfferType OfferType { get; set; }

        [Required]
        public string OfferDescription { get; set; }

        [Required]
        public ICollection<SocialNetwork> SocialNetworks { get; set; }

        [Required]
        public OfferStatus Status { get; set; }

    }
}
