require 'json'

package = JSON.parse(File.read(File.join(__dir__, '../package.json')))

Pod::Spec.new do |s|
  s.name           = "RNThread"
  s.version        = package['version']
  s.summary        = "React native threads"
  s.description    = "React native threads"
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = "https://github.com/joltup/RNThread.git"
  s.source       = { :git => "https://github.com/joltup/RNThread.git", :tag => s.version }
  s.source_files  = "**/*.{h,m}"
  s.platform      = :ios, "7.0"
  s.tvos.deployment_target = '10.0'

  s.dependency 'React'
end
