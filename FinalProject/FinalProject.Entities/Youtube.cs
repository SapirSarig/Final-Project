using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FinalProject.Entities
{

    public enum Type
    {
        Image,
        Video,
        Story
    }

    public enum OfferStatus
    {
        InProcess,
        Canceled,
        Completed
    }

    public enum Interest
    {
        Sport,
        Beauty,
        /////Add more...
        Etc
    }
    public class Youtube : SocialNetwork
    {
        //...
    }

}
