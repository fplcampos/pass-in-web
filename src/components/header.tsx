import nlwUniteIcon from '../assets/nlw-unite-icon.svg'
import { NavLinks } from './nav-links'

export function Header() {
    return (
        <div className='flex items-center gap-5 py-2'>
            <img src={nlwUniteIcon} />

            <nav className='flex items-center gap-5'>
                <NavLinks href="/eventos">Eventos</NavLinks>
                <NavLinks href="/participantes">Participantes</NavLinks>
            </nav>
        </div>
    )
}