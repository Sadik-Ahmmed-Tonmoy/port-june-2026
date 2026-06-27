import ScrollBaseAnimation from "@/components/uilayouts/ScrollBaseAnimation"

function ScrollText () {
    return (<div className='h-[500px] grid place-content-center'>
        <ScrollBaseAnimation
          delay={500}
          baseVelocity={-2}
            scrollDependent={true}
          clasname='font-bold tracking-[-0.07em] leading-[90%]'
        >
           {/* write relevent text */}
           I build websites that help businesses do boring things better.
        </ScrollBaseAnimation>
        <ScrollBaseAnimation
          delay={500}
          baseVelocity={2}
            scrollDependent={true}
          clasname='font-bold tracking-[-0.07em] leading-[90%]'
        >
           {/* write relevent text */}
            I bring ideas to life with clean, scalable, and user-focused code.  
        </ScrollBaseAnimation>
      </div>)
}

export default ScrollText