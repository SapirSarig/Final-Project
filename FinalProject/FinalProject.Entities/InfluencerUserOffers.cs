using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    [Table("InfluencerUserOffers")]
    public class InfluencerUserOffers
    {

        [Key]
        [ForeignKey("Offer")]
        public int OfferRefId { get; set; }
        public Offer Offer { get; set; }

        [Required]
        [ForeignKey("InfluencerUser")]        
        public int InfluencerUserRefId { get; set; }
        public InfluencerUser InfluencerUser { get; set; }


    }
}